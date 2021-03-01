const ironKit = () => ({
    name: 'Iron Kit',
    extensionId: 'ironKit',
    version: '1.0.0',
    type: 'arduino',
    supportDevice: ['ironKit'],
    featured: true,
    blocks: `blocks.js`,
    generator: `generator.js`,
    toolbox: `toolbox.js`,
    msg: `msg.js`,
    tags: [],
    helpLink: 'https://www.sxyiqichuang.com'
});

module.exports = ironKit;
