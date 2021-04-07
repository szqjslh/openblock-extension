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

        this._updaterPath = path.join(this._userDataPath, '../updater/extensions');
        this._configPath = path.join(this._userDataPath, 'config.json');

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

    checkShouldUpdate () {
        return new Promise((resolve, reject) => {
            if (fs.existsSync(this._configPath)) {

                this._config = require(this._configPath); // eslint-disable-line global-require

                if (this._config.user && this._config.repo) {
                    // Get the latest version for remote server
                    releaseDownloader.getReleaseList(`${this._config.user}/${this._config.repo}`)
                        .then(release => {
                            const latestVersion = release[0].tag_name;
                            if (this._config.version) {
                                const curentVersion = this._config.version;
                                if (compareVersions.compare(latestVersion, curentVersion, '>')) {
                                    return resolve(latestVersion);
                                }
                            } else {
                                return reject(`Cannot find version tag in: ${this._configPath}`);
                            }
                            return resolve();
                        })
                        .catch(err => reject(`Error while getting realse list of ` +
                        `${this._config.user}/${this._config.repo}: ${err}`));
                } else {
                    return reject(`Cannot find valid git repo configuration in: ${this._configPath}`);
                }
            } else {
                return reject(`Cannot find file: ${this._configPath}`);
            }
        });
    }

    checkAndDownloadUpdate () {
        return new Promise((resolve, reject) => {
            this.checkShouldUpdate().then(version => {
                if (version) {
                    console.log('new version detected:', version);
                    this._updaterVersion = version;

                    const updaterExtensionConfig = path.join(this._updaterPath, 'config.json');
                    if (fs.existsSync(updaterExtensionConfig)) {
                        // read the extension version in updater
                        // eslint-disable-next-line global-require
                        const updaterExtensionVersion = require(updaterExtensionConfig).updaterVersion;
                        // the new version has been downloaded
                        if (updaterExtensionVersion === version) {
                            return resolve('skip download, the latest version has been downloaded');
                        }
                    }

                    // if there is no updater dir, create it
                    if (!fs.existsSync(path.join(this._updaterPath, '../'))){
                        fs.mkdirSync(path.join(this._updaterPath, '../'), {recursive: true});
                    }

                    // delet the old data and download new
                    rimraf.sync(this._updaterPath);
                    // download and unzip the new extensions
                    ghdownload({user: this._config.user, repo: this._config.repo, ref: version}, this._updaterPath)
                        .on('error', err => reject(`Error while downloading ${this._config.user}/` +
                            `${this._config.repo} ${this._latestVersion}: ${err}`))
                        .on('zip', zipUrl => {
                            console.log(`${zipUrl} downloading...`);
                        })
                        .on('end', () => {
                            const config = Object.assign({}, this._config);
                            delete config.version;
                            config.updaterVersion = version;
                            fs.writeFileSync(updaterExtensionConfig, JSON.stringify(config));
                            return resolve('download finish');
                        });
                } else {
                    return reject('Already up to date.');
                }
            })
                .catch(err => reject(`Error while checking the update: ${err}`));
        });
    }

    update () {
        rimraf.sync(this._userDataPath);
        copydir.sync(this._updaterPath, this._userDataPath, {utimes: true, mode: true});
        rimraf.sync(this._updaterPath);
        // write the new version tag to config.json to finitsh upload
        const config = Object.assign({}, this._config);
        config.version = this._updaterVersion;
        fs.writeFileSync(this._configPath, JSON.stringify(config));
        console.log('update finish');
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
