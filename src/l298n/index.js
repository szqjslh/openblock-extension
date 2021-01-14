const l298n = formatMessage => ({
    name: 'L298N',
    extensionId: 'l298n',
    version: '1.0.0',
    type: 'arduino',
    supportDevice: ['arduinoUno', 'arduinoNano', 'arduinoLeonardo', 'arduinoMega2560'],
    author: 'Liang',
    iconURL: `asset/L28N.png`,
    description: formatMessage({
        id: 'l298n.description',
        default: 'l298n motor drive module.',
        description: 'Description of dht11'
    }),
    featured: true,
    blocks: `blocks.js`,
    generator: `generator.js`,
    toolbox: `toolbox.js`,
    msg: `msg.js`,
    location: 'local', // or 'remote'
    tags: ['actuator'],
    helpLink: 'https://www.baidu.com'
});

module.exports = l298n;
