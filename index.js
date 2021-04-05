const formatMessage = require('format-message');
const osLocale = require('os-locale');
const express = require('express');
const requireAll = require('require-all');
const Emitter = require('events');
const path = require('path');
const fs = require('fs');
const copydir = require('copy-dir');
const releaseDownloader = require('@fohlen/github-release-downloader');
const ghdownload = require('github-download');
const rimraf = require('rimraf');
const compareVersions = require('compare-versions');

/**
 * Configuration the default user data path.
 * @readonly
 */
const DEFAULT_USER_DATA_PATH = path.join(__dirname, '../.openblockData');

/**
 * Configuration the default port.
 * @readonly
 */
const DEFAULT_PORT = 20120;

/**
 * Configuration the default language.
 * @readonly
 */
const DEFAULT_LANGUAGE = 'en';

/**
 * Extenions class.
 * @readonly
 */
const EXTENSION_CLASS = ['sheild', 'actuator', 'sensor', 'communication', 'display', 'kit', 'other'];

/**
 * Device tyoe.
 * @readonly
 */
const DEVICE_TYPE = ['arduino', 'microbit'];

/**
 * A server to provide local extensions resource.
 */
class OpenBlockExtension extends Emitter{

    /**
     * Construct a OpenBlock extension server object.
     * @param {string} userDataPath - the path of user data.
     * @param {string} extensionsPath - the path of initial extensions data.
     */
    constructor (userDataPath, extensionsPath) {
        super();

        if (userDataPath) {
            this._userDataPath = path.join(userDataPath, 'extensions');
        } else {
            this._userDataPath = path.join(DEFAULT_USER_DATA_PATH, 'extensions');
        }

        if (extensionsPath) {
            this._extensionsPath = extensionsPath;
        } else {
            this._extensionsPath = path.join(__dirname, 'extensions');
        }

        this._socketPort = DEFAULT_PORT;
        this._locale = DEFAULT_LANGUAGE;

        if (this.checkFirstRun()) {
            this.copyToUserDataPath();
        }
    }

    checkFirstRun () {
        if (!fs.existsSync(this._userDataPath)) {
            console.log(`copy extensions file to ${this._userDataPath}`);
            return true;
        }
        return false;
    }

    copyToUserDataPath () {
        if (!fs.existsSync(this._userDataPath)) {
            fs.mkdirSync(this._userDataPath, {recursive: true});
        }
        copydir.sync(this._extensionsPath, this._userDataPath, {utimes: true, mode: true});
    }

    setLocale () {
        return new Promise(resolve => {
            osLocale().then(locale => {
                if (locale === 'zh-CN') {
                    this._locale = 'zh-cn';
                } else if (locale === 'zh-TW') {
                    this._locale = 'zh-tw';
                } else {
                    this._locale = locale;
                }
                console.log('set locale:', this._locale);

                formatMessage.setup({
                    locale: this._locale,
                    // eslint-disable-next-line global-require
                    translations: require(path.join(this._userDataPath, 'locales.js'))
                });
                return resolve();
            });
        });
    }

    checkForUpdates () {
        this._configPath = path.join(this._userDataPath, 'config.json');

        if (fs.existsSync(this._configPath)) {
            // eslint-disable-next-line global-require
            this._config = require(this._configPath);

            return new Promise(resolve => {
                releaseDownloader.getReleaseList(`${this._config.user}/${this._config.repo}`).then(release => {
                    this._latestVersion = release[0].tag_name;
                    const curentVersion = this._config.version;

                    resolve(compareVersions.compare(this._latestVersion, curentVersion, '>'));
                });
            }).catch(err => {
                console.error(err);
            });
        }
        return Promise.resolve(false);
    }

    update () {
        rimraf(this._userDataPath, () => {
            ghdownload({user: this._config.user, repo: this._config.repo, ref: this._latestVersion}, this._userDataPath)
                .on('error', err => {
                    console.error(`error while downloading ${this._config.user}/` +
                        `${this._config.repo} ${this._latestVersion}:`, err);
                })
                .on('zip', zipUrl => {
                    console.log(`${zipUrl} downloading...`);
                })
                .on('end', () => {
                    console.log('finish');

                    this._config.version = this._latestVersion;
                    fs.writeFileSync(this._configPath, JSON.stringify(this._config));
                });
        });
    }

    /**
     * Start a server listening for connections.
     * @param {number} port - the port to listen.
     */
    listen (port) {
        if (port) {
            this._socketPort = port;
        }

        this.setLocale().then(() => {
            const extensionsThumbnailData = [];

            DEVICE_TYPE.forEach(deviceType => {
                EXTENSION_CLASS.forEach(extClass => {
                    const extPath = path.join(this._userDataPath, deviceType, extClass);
                    if (fs.existsSync(extPath)) {
                        const data = requireAll({dirname: extPath, filter: /index.js$/, recursive: true});
                        Object.entries(data).forEach(ext => {
                            // Modify the attribute to point to the real address.
                            const content = ext[1]['index.js'](formatMessage);
                            const basePath = path.join(deviceType, extClass, ext[0]);

                            if (content.iconURL) {
                                content.iconURL = path.join(basePath, content.iconURL);
                            }
                            content.blocks = path.join(basePath, content.blocks);
                            content.generator = path.join(basePath, content.generator);
                            content.toolbox = path.join(basePath, content.toolbox);
                            content.msg = path.join(basePath, content.msg);

                            if (content.library) {
                                content.library = path.join(extPath, ext[0], content.library);
                            }
                            extensionsThumbnailData.push(content);
                        });
                    }
                });
            });

            this._app = express();

            this._app.use((req, res, next) => {
                res.header('Access-Control-Allow-Origin', '*');
                res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
                next();
            });
            this._app.use(express.static(`${this._userDataPath}`));

            this._app.get('/', (req, res) => {
                res.send(JSON.stringify(extensionsThumbnailData));
            });

            this._app.listen(this._socketPort);

            this.emit('ready');
            console.log(`socket server listend: http://0.0.0.0:${this._socketPort}\n\nOpenblock extension server start successfully`);
        });
    }
}

module.exports = OpenBlockExtension;
