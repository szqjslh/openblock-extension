function addGenerator(Blockly) {
    Blockly.Arduino['dht_init'] = function (block) {
        let no = Blockly.Arduino.valueToCode(this, 'no', Blockly.Arduino.ORDER_ATOMIC);
        let pin = this.getFieldValue('pin');
        let mode = this.getFieldValue('mode');

        Blockly.Arduino.includes_['include_dht_init'] = `#include "<DHT.h>"`;
        Blockly.Arduino.definitions_[`define_dht_init_${no}`] = `DHT dht_${no}(${pin}, ${mode});`;
        return '';
    }

    Blockly.Arduino['dht_readHumidity'] = function (block) {
        let no = Blockly.Arduino.valueToCode(this, 'no', Blockly.Arduino.ORDER_ATOMIC);
        return [`dht_${no}.readHumidity()`, Blockly.Arduino.ORDER_ATOMIC];
    }

    Blockly.Arduino['dht_readTemperature'] = function (block) {
        let no = Blockly.Arduino.valueToCode(this, 'no', Blockly.Arduino.ORDER_ATOMIC);
        let unit = this.getFieldValue('unit');
        return [`dht_${no}.readTemperature(${unit})`, Blockly.Arduino.ORDER_ATOMIC];
    }

    return Blockly;
}

exports = addGenerator;
