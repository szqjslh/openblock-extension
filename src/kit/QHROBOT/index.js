/**
 * Note！ These codes are from third parties. Not currently reviewed by the community.
 * Please do not refer to the format specifications of these codes.
 */
const QDPRobot = formatMessage => ({
    name: 'QDP',
    extensionId: 'QDPRobot',
    version: '1.0.0',
    type: 'arduino',
    supportDevice: [], // Hide kit extension in library
    author: 'QDProbot',
    iconURL: `asset/QH.png`,
    description: formatMessage({
        id: 'QDPRobot.description',
        default: 'QDP robot',
        description: 'Description of QDP robot'
    }),
    featured: true,
    blocks: `blocks.js`,
    generator: `generator.js`,
    toolbox: `toolbox.js`,
    msg: `msg.js`,
    tags: ['kit'],
    helpLink: 'http://www.qdprobot.com/'
});

module.exports = QDPRobot;
