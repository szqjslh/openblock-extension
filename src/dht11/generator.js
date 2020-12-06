function addGenerator(Blockly) {
    Blockly.Arduino['DHT_INIT'] = function (block) {
        let no = Blockly.Arduino.valueToCode(this, 'no', Blockly.Arduino.ORDER_ATOMIC);
        let pin = this.getFieldValue('pin');
        let mode = this.getFieldValue('mode');

        Blockly.Arduino.includes_['include_DHT_INIT'] = `#include "<DHT.h>"`;
        Blockly.Arduino.definitions_['define_DHT_INIT'] = `DHT dht_${no}(${pin}, ${mode});`;
        return '';
    }

    Blockly.Arduino['DHT_READ_HUMIDITY'] = function (block) {
        let no = Blockly.Arduino.valueToCode(this, 'no', Blockly.Arduino.ORDER_ATOMIC);
        return [`dht_${no}.readHumidity()`, Blockly.Arduino.ORDER_ATOMIC];
    }

    Blockly.Arduino['DHT_READ_TEMPERATURE'] = function (block) {
        let no = Blockly.Arduino.valueToCode(this, 'no', Blockly.Arduino.ORDER_ATOMIC);
        let unit = this.getFieldValue('unit');
        return [`dht_${no}.readTemperature(${unit})`, Blockly.Arduino.ORDER_ATOMIC];
    }

    return Blockly;
}

exports = addGenerator;
