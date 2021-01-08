module.paths = module.paths.concat(require.main.paths);
const formatMessage = require('format-message');

const oled = {
    name: 'OLED',
    extensionId: 'oled',
    version: '0.0.1',
    supportDevice: ['arduinoUno'],
    author: 'Test',
    type: 'arduino',
    iconURL: `asset/OLED.png`,
    description: formatMessage({
        id: 'oled.description',
        default: 'I2C oled display',
        description: 'Description of oled'
    }),
    featured: true,
    blocks: `block.js`,
    generator: `generator.js`,
    toolbox: `toolbox.xml`,
    msg: `language`,
    location: 'local',
    tags: ['display'],
    helpLink: 'https://www.baidu.com',
    disabled: true
};

module.exports = oled;
