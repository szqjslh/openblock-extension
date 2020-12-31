const formatMessage = require('format-message');
const osLocale = require('os-locale');
const express = require('express');
const requireAll = require('require-all');
const Emitter = require('events');

const translations = require('./locales.js');

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
class ScratchHWExtensionServer extends Emitter{

    /**
     * Construct a ScratchHW extension server object.
     */
    constructor () {
        super();

        this._socketPort = DEFAULT_PORT;
        this._locale = DEFAULT_LANGUAGE;
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
                    translations: translations
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
            let extensions = requireAll({
                dirname: `${__dirname}/src`,
                filter: /index.js$/,
                recursive: true
            });

            extensions = Object.entries(extensions);
            extensions = extensions.map(ext => ext[1]['index.js']);

            this._app = express();

            this._app.use((req, res, next) => {
                res.header('Access-Control-Allow-Origin', '*');
                res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
                next();
            });
            this._app.use(express.static(`${__dirname}/src`));

            this._app.get('/', (req, res) => {
                res.send(JSON.stringify(extensions));
            });

            this._app.listen(this._socketPort);

            this.emit('ready');
            console.log('socket server listend:', `http://127.0.0.1:${this._socketPort}`);
        });
    }
}

module.exports = ScratchHWExtensionServer;
