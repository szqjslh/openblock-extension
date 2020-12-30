const formatMessage = require('format-message');
const path = require('path');

const staticPath = path.relative(`${__dirname}/../../src`, __dirname);

const hcSr04 = {
    name: 'HC_SR04',
    extensionId: 'hc_sr04',
    version: '1.0.0',
    supportDevice: ['arduinoUno', 'arduinoNano', 'arduinoLeonardo', 'arduinoMega2560'],
    author: 'Liang',
    iconURL: `${staticPath}/asset/HC-SR04.png`,
    description: formatMessage({
        id: 'hc-sr04.description',
        default: 'HC-SR04 distance measurement module.',
        description: 'Description of HC-SR04'
    }),
    featured: true,
    blocks: `${staticPath}/blocks.js`,
    generator: `${staticPath}/generator.js`,
    toolbox: `${staticPath}/toolbox.js`,
    msg: `${staticPath}/msg.js`,
    location: 'local', // or 'remote'
    tags: ['sensor'],
    link: 'https://www.baidu.com'
};

module.exports = hcSr04;
