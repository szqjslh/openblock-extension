function addMsg(Blockly) {
    Object.assign(Blockly.ScratchMsgs.locales["en"], {
        HC_SR04_CATEGORY: 'HC_SR04',
        HC_SR04_READ_DISTANCE : 'ultrasonic sensor trig pin %1 echo pin %2',
        // DHT_READ_TEMPERATURE: 'dht %1 read temperature %2',
        // DHT_READ_HUMIDITY : 'dht %1 read humidity',
    });
    Object.assign(Blockly.ScratchMsgs.locales["zh-cn"], {
        HC_SR04_CATEGORY: 'HC_SR04',
        HC_SR04_READ_DISTANCE : '超声波传感器trig引脚 %1 echo引脚 %2 ',
        // DHT_READ_TEMPERATURE: 'dht %1 读取温度 %2',
        // DHT_READ_HUMIDITY : 'dht %1 读取湿度',
    });
    return Blockly;
}

exports = addMsg;

