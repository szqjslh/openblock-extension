module.paths = module.paths.concat(require.main.paths);
const formatMessage = require('format-message');

const hcSr04 = {
    name: 'HC_SR04',
    extensionId: 'hc_sr04',
    version: '1.0.0',
    type: 'arduino',
    supportDevice: ['arduinoUno', 'arduinoNano', 'arduinoLeonardo', 'arduinoMega2560'],
    author: 'Liang',
    iconURL: `asset/HC-SR04.png`,
    description: formatMessage({
        id: 'hc-sr04.description',
        default: 'HC-SR04 distance measurement module.',
        description: 'Description of HC-SR04'
    }),
    featured: true,
    blocks: `blocks.js`,
    generator: `generator.js`,
    toolbox: `toolbox.js`,
    msg: `msg.js`,
    location: 'local', // or 'remote'
    tags: ['sensor'],
    helpLink: 'https://www.baidu.com'
};

module.exports = hcSr04;
