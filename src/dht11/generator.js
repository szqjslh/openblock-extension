function addGenerator(Blockly) {
    Blockly.Arduino['motorDriverBoard_dht11'] = function(block) {
        var dropdown_dht11 = this.getFieldValue('dht11');
        var dropdown_temhum = this.getFieldValue('temhum');
        Blockly.Arduino.definitions_['include_ph_dht11'] = '#include "dht11.h"\n';
        Blockly.Arduino.definitions_['include_PH20Port'] = '#include "PH20Port.h"\n';
        Blockly.Arduino.definitions_['include_ph_port'] = 'dht11 dht11;\n';
        Blockly.Arduino.definitions_['ph_port'] = 'PH20Port dhtPort(' + dropdown_dht11 + ");\n";
        Blockly.Arduino.definitions_['timer_run_read'] = 'dht11.read(dhtPort.pin1());\n';
        var code = '(float)dht11.'+ dropdown_temhum;
        return [code, Blockly.Arduino.ORDER_ATOMIC];
    }
    return Blockly;
}

exports = addGenerator;
