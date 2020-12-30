const formatMessage = require('format-message');
const path = require('path');

const staticPath = path.relative(`${__dirname}/../../src`, __dirname);

const softwareSerial = {
    name: formatMessage({
        id: 'softwareSerial.name',
        default: 'Software serial',
        description: 'Name of software serial'
    }),
    extensionId: 'softwareSerial',
    version: '1.0.0',
    supportDevice: ['arduinoUno', 'arduinoNano', 'arduinoLeonardo', 'arduinoMega2560'],
    author: 'ArthurZheng',
    iconURL: `${staticPath}/asset/softwareSerial.png`,
    description: formatMessage({
        id: 'softwareSerial.description',
        default: 'Allow serial communication on other digital pins of the Arduino.',
        description: 'Description of software serial'
    }),
    featured: true,
    blocks: `${staticPath}/blocks.js`,
    generator: `${staticPath}/generator.js`,
    toolbox: `${staticPath}/toolbox.js`,
    msg: `${staticPath}/msg.js`,
    location: 'local', // or 'remote'
    tags: ['other'],
    link: 'https://www.baidu.com'
};

module.exports = softwareSerial;
