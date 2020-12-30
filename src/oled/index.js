const formatMessage = require('format-message');
const path = require('path');

const staticPath = path.relative(`${__dirname}/../../src`, __dirname);

const oled = {
    name: 'OLED',
    extensionId: 'oled',
    version: '0.0.1',
    supportDevice: ['arduinoUno'],
    author: 'Test',
    iconURL: `${staticPath}/asset/OLED.png`,
    description: formatMessage({
        id: 'oled.description',
        default: 'I2C oled display',
        description: 'Description of oled'
    }),
    featured: true,
    blocks: `${staticPath}block.js`,
    generator: `${staticPath}./generator.js`,
    toolbox: `${staticPath}./toolbox.xml`,
    msg: `${staticPath}./language`,
    // arduino_lib: "lib",
    location: 'local',
    tags: ['display'],
    link: 'https://www.baidu.com',
    disabled: true
};

module.exports = oled;
