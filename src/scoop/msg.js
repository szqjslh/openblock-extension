/* eslint-disable func-style */
/* eslint-disable require-jsdoc */
function addMsg (Blockly) {
    Object.assign(Blockly.ScratchMsgs.locales.en, {
        COOPERATIVESCHEDULER_CATEGORY: 'Cooperative scheduler',
        COOPERATIVESCHEDULER_START: 'start cooperative scheduler',
        COOPERATIVESCHEDULER_SETUP: 'cooperative scheduler %1 setup',
        COOPERATIVESCHEDULER_SLEEP: 'sleep %1 ms'
    });
    Object.assign(Blockly.ScratchMsgs.locales['zh-cn'], {
        COOPERATIVESCHEDULER_CATEGORY: '多任务调度器',
        COOPERATIVESCHEDULER_START: '启动多任务调度器',
        COOPERATIVESCHEDULER_SETUP: '多任务调度器 %1 setup',
        COOPERATIVESCHEDULER_SLEEP: '休眠 %1 ms'
    });
    return Blockly;
}

exports = addMsg;
