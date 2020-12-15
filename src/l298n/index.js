const formatMessage = require('format-message');
var path = require('path');

const staticPath = path.relative(__dirname + '/../../src', __dirname);

const l298n = {
    name: "L298N",
    extensionId: 'l298n',
    version: "1.0.0",
    supportDevice: ['arduinoUno'],
    author: 'Liang',
    iconURL: staticPath + '/asset/L28N.png',
    description: formatMessage({
        id: 'l298n.description',
        default: 'l298n motor drive module',
        description: 'Description description of dht11'
    }),
    featured: true,
    blocks: staticPath + '/blocks.js',
    generator:  staticPath + '/generator.js',
    toolbox:  staticPath + '/toolbox.js',
    msg: staticPath + '/msg.js',
    location: 'local',     // or 'remote'
    link: 'https://www.baidu.com',
}

module.exports = l298n;
