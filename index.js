const formatMessage = require('format-message');
const osLocale = require('os-locale');
const express = require('express');
const requireAll = require('require-all');
const Emitter = require('events');
const path = require('path');
const fs = require('fs');
const copydir = require('copy-dir');

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
 * @class A server to provide local extensions resource.
 */
class OpenBlockExtension extends Emitter{

    /**
     * Construct a OpenBlock extension server object.
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
            this._extensionsPath = path.join(__dirname, 'src');
        }

        this._socketPort = DEFAULT_PORT;
        this._locale = DEFAULT_LANGUAGE;

        if (this.checkFirstRun()) {
            this.copyToUserDataPath();
        }
    }

    checkFirstRun () {
        if (!fs.existsSync(this._userDataPath)) {
            console.log(`First start, copy extensions file to ${this._userDataPath}`);
            return true;
        }
        return false;
    }

    copyToUserDataPath () {
        formatMessage.setup({missingTranslation: 'ignore'});

        const extensions = requireAll({
            dirname: this._extensionsPath,
            filter: /index.js$/,
            recursive: true
        });

        Object.entries(extensions).forEach(catlog => {
            Object.entries(catlog[1]).forEach(ext => {
                const basePath = path.join(catlog[0], ext[0]);
                const src = path.join(this._extensionsPath, basePath);
                const dst = path.join(this._userDataPath, 'exts', basePath);
                const type = ext[1]['index.js'](formatMessage).type;

                if (!fs.existsSync(dst)) {
                    fs.mkdirSync(dst, {recursive: true});
                }

                copydir.sync(src, dst,
                    {
                        utimes: true,
                        mode: true,
                        filter: function (stat, filepath, filename){
                        // do not want copy lib directories
                            if (stat === 'directory' && filename === 'lib') {
                                return false;
                            }
                            return true;
                        }
                    }
                );

                // if arduino copy the lib to '${this._userDataPath}/libraries/Arduino' if it is exist.
                if (type === 'arduino') {
                    const lib = path.join(src, 'lib');
                    const arduinoLibPath = path.join(this._userDataPath, 'libraries/Arduino');
                    if (fs.existsSync(lib)) {
                        if (!fs.existsSync(arduinoLibPath)) {
                            fs.mkdirSync(arduinoLibPath, {recursive: true});
                        }
                        copydir.sync(path.join(src, 'lib'), arduinoLibPath,
                            {utimes: true, mode: true});
                    }
                }
            });
        });

        // Copy the tranlation file to the userDataPath for extenions's index file.
        copydir.sync(path.join(this._extensionsPath, 'locales.js'),
            path.join(this._userDataPath, 'exts/locales.js'), {utimes: true, mode: true});

        formatMessage.setup({missingTranslation: 'warning'});
    }

    setLocale () {
        return new Promise((resolve, reject) => {
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
                    translations: require(path.join(this._userDataPath, 'exts', 'locales.js'))
                });
                return resolve();
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
            const extensions = requireAll({
                dirname: `${this._userDataPath}/exts`,
                filter: /index.js$/,
                recursive: true
            });

            const extensionsThumbnailData = [];
            Object.entries(extensions).forEach(catlog => {
                Object.entries(catlog[1]).forEach(ext => {

                    const content = ext[1]['index.js'](formatMessage);
                    const basePath = path.join(catlog[0], ext[0]);

                    if (content.iconURL) {
                        content.iconURL = path.join(basePath, content.iconURL);
                    }
                    content.blocks = path.join(basePath, content.blocks);
                    content.generator = path.join(basePath, content.generator);
                    content.toolbox = path.join(basePath, content.toolbox);
                    content.msg = path.join(basePath, content.msg);
                    extensionsThumbnailData.push(content);
                });
            });

            this._app = express();

            this._app.use((req, res, next) => {
                res.header('Access-Control-Allow-Origin', '*');
                res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
                next();
            });
            this._app.use(express.static(`${this._userDataPath}/exts`));

            this._app.get('/', (req, res) => {
                res.send(JSON.stringify(extensionsThumbnailData));
            });

            this._app.listen(this._socketPort);

            this.emit('ready');
            console.log('socket server listend:', `http://127.0.0.1:${this._socketPort}`);
        });
    }
}

module.exports = OpenBlockExtension;
