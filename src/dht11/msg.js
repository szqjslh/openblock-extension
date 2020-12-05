function addMsg(Blockly) {
    Object.assign(Blockly.ScratchMsgs.locales["en"], {
        "CATEGORY_SENSOR": "Sensor",
        "MOTORDRIVERBOARD_DHT": "Temperature and humidity sensor DHT11 interface",
        "MOTORDRIVERBOARD_READDHT": "Read",
        "MOTORDRIVERBOARD_TEMPERATURE": "temperature",
        "MOTORDRIVERBOARD_HUMIDITY": "humidity"
    });
    Object.assign(Blockly.ScratchMsgs.locales["zh-cn"], {
        "CATEGORY_SENSOR": "传感器",
        "MOTORDRIVERBOARD_DHT": "温湿度传感器DHT11接口",
        "MOTORDRIVERBOARD_READDHT": "读取",
        "MOTORDRIVERBOARD_TEMPERATURE": "温度",
        "MOTORDRIVERBOARD_HUMIDITY": "湿度"
    });
    return Blockly;
}

exports = addMsg;

