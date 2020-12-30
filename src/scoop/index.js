const formatMessage = require('format-message');
const path = require('path');

const staticPath = path.relative(`${__dirname}/../../src`, __dirname);

const softwareSerial = {
    name: formatMessage({
        id: 'cooperativeScheduler.name',
        default: 'Cooperative scheduler',
        description: 'Name of cooperative scheduler'
    }),
    extensionId: 'cooperativeScheduler',
    version: '1.0.0',
    supportDevice: ['arduinoUno', 'arduinoNano', 'arduinoLeonardo', 'arduinoMega2560'],
    author: 'ArthurZheng',
    iconURL: `${staticPath}/asset/cooperativeScheduler.png`,
    description: formatMessage({
        id: 'cooperativeScheduler.description',
        default: 'Allow Arduino run multiple applications.',
        description: 'Description of cooperative scheduler'
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
