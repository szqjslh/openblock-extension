function addMsg(Blockly) {
    Object.assign(Blockly.ScratchMsgs.locales["en"], {
        L298N_CATEGORY: 'L298N',
        L298N_INIT : 'init L298N input1 %1 input2 %2 input3 %3 input4 %4',
        L298N_FORWARD: 'motor run forword  ',
        L298N_BACK: 'motor run back',
        L298N_LEFT: 'motor run left',
        L298N_RIGHT: 'motor run right ',
        L298N_STOP: 'motor stop ',
    });
    Object.assign(Blockly.ScratchMsgs.locales["zh-cn"], {
        L298N_CATEGORY: 'L298N',
        L298N_INIT : '初始化 L298N input1 %1 input2 %2 input3 %3 input4 %4',
        L298N_FORWARD: '控制电机前进',
        L298N_BACK: '控制电机后退',
        L298N_LEFT: '控制电机向左',
        L298N_RIGHT: '控制电机向右 ',
        L298N_STOP: '控制电机停止 ',
    });
    return Blockly;
}

exports = addMsg;

