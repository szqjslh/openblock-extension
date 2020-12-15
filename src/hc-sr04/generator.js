function addGenerator(Blockly) {

    Blockly.Arduino['hc_sr04_read_distance'] = function (block) {
        Blockly.Arduino.definitions_['define_hc_sr04_read_distance'] = ` float getDistance(int trig,int echo){
            pinMode(trig,OUTPUT);
            digitalWrite(trig,LOW);
            delayMicroseconds(2);
            digitalWrite(trig,HIGH);
            delayMicroseconds(10);
            digitalWrite(trig,LOW);
            pinMode(echo, INPUT);
            return pulseIn(echo,HIGH,30000)/58.0;
        } `;

        let trig_pin = this.getFieldValue('trig_pin');
        let echo_pin = this.getFieldValue('echo_pin');
        // let no = Blockly.Arduino.valueToCode(this, 'no', Blockly.Arduino.ORDER_ATOMIC);
        // let unit = this.getFieldValue('unit');
        // ${trig_pin}
        // ${echo_pin}
        return [`getDistance(${trig_pin},${echo_pin})`, Blockly.Arduino.ORDER_ATOMIC];
    }


    return Blockly;
}

exports = addGenerator;
