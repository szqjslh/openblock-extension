/**
 * Note！ These codes are from third parties. Not currently reviewed by the community.
 * Please do not refer to the format specifications of these codes.
 */
const QDPRobot = formatMessage => ({
    name: 'QDP',
    extensionId: 'QDPRobot',
    version: '1.0.0',
    type: 'arduino',
    supportDevice: ['arduinoUno', 'arduinoNano', 'arduinoLeonardo', 'arduinoMega2560'],
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
    tags: ['actuator', 'sensor', 'display', 'communication', 'other'],
    helpLink: 'https://qdprobot.taobao.com'
});

module.exports = QDPRobot;
