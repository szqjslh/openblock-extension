const path = require('path');
const requireAll = require('require-all');
const formatMessage = require('format-message');
const fs = require('fs');
const copydir = require('copy-dir');

const buildPath = path.join(__dirname, '../dist');
const translations = require(path.join(__dirname, '../extensions/locales.js'));

const EXTENSION_CLASS = ['sheild', 'actuator', 'sensor', 'communication', 'display', 'kit', 'other'];
const DEVICE_TYPE = ['arduino', 'microbit'];

const parseArgs = () => {
    const scriptArgs = process.argv.slice(2); // remove `node` and `this-script.js`
    const builderArgs = [];
    let url = '0.0.0.0';

    for (const arg of scriptArgs) {
        const urlSplit = arg.split(/--url(\s+|=)/);
        if (urlSplit.length === 3) {
            url = urlSplit[2];
        } else {
            builderArgs.push(arg);
        }
    }

    return url;
};

const url = parseArgs();

Object.entries(translations).forEach(locale => {
    locale = locale[0];

    formatMessage.setup({
        locale: locale,
        translations: translations
    });
    const extensionsThumbnailData = [];

    DEVICE_TYPE.forEach(deviceType => {
        EXTENSION_CLASS.forEach(extClass => {
            const extPath = path.join(__dirname, '../extensions', deviceType, extClass);
            if (fs.existsSync(extPath)) {
                const data = requireAll({dirname: extPath, filter: /index.js$/, recursive: true});
                Object.entries(data).forEach(ext => {
                    // Modify the attribute to point to the real address.
                    const content = ext[1]['index.js'](formatMessage);
                    const basePath = path.join(url, deviceType, extClass, ext[0]);

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

    copydir.sync(path.join(__dirname, '../extensions'), path.join(__dirname, '../dist'), {
        utimes: true,
        mode: true,
        filter: (stat, filepath) => {
            // do not want copy .js files
            if (stat === 'file' && path.extname(filepath) === '.js') {
                return false;
            }
            return true;
        }
    });

    if (!fs.existsSync(buildPath)) {
        fs.mkdirSync(buildPath);
    }
    fs.writeFileSync(path.join(buildPath, `index.${locale}.json`), JSON.stringify(extensionsThumbnailData));

});
