const formatMessage = require('format-message');
var path = require('path');

const staticPath = path.relative(__dirname + '/../../src', __dirname);

const hc_sr04 = {
    name: "HC_SR04",
    extensionId: 'hc_sr04',
    version: "1.0.0",
    supportDevice: ['arduinoUno'],
    author: 'Liang',
    iconURL: staticPath + '/asset/HC-SR04.png',
    description: formatMessage({
        id: 'hc-sr04.description',
        default: 'HC-SR04 distance measurement module.',
        description: 'Description description of HC-SR04'
    }),
    featured: true,
    blocks: staticPath + '/blocks.js',
    generator:  staticPath + '/generator.js',
    toolbox:  staticPath + '/toolbox.js',
    msg: staticPath + '/msg.js',
    location: 'local',     // or 'remote'
    link: 'https://www.baidu.com',
}

module.exports = hc_sr04;
