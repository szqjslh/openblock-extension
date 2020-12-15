function addGenerator(Blockly) {
    Blockly.Arduino['l298n_init'] = function (block) {
        // let no = Blockly.Arduino.valueToCode(this, 'no', Blockly.Arduino.ORDER_ATOMIC);
        // let pin = this.getFieldValue('pin');
        // let mode = this.getFieldValue('mode');
        let input1 = this.getFieldValue('input1');
        let input2 = this.getFieldValue('input2');
        let input3 = this.getFieldValue('input3');
        let input4 = this.getFieldValue('input4');

        
        // Blockly.Arduino.includes_['include_l298n_init'] = `#include "<DHT.h>"`;
        Blockly.Arduino.definitions_[`define_l298n_init_input1`] = `int input1=${input1};`;
        Blockly.Arduino.definitions_[`define_l298n_init_input2`] = `int input2=${input2};`;
        Blockly.Arduino.definitions_[`define_l298n_init_input3`] = `int input3=${input3};`;
        Blockly.Arduino.definitions_[`define_l298n_init_input4`] = `int input4=${input4};`;
        //向前转
        Blockly.Arduino.definitions_[`define_l298n_init_forward`] = `void forward(){//forward 向前转
digitalWrite(input1,HIGH); //给高电平
digitalWrite(input2,LOW);  //给低电平
digitalWrite(input3,HIGH); //给高电平
digitalWrite(input4,LOW);  //给低电平
delay(500);   //延时1秒    
} 
`
        Blockly.Arduino.definitions_[`define_l298n_init_stop`] = `void stop(){
//stop 停止
digitalWrite(input1,LOW);
digitalWrite(input2,LOW);  
digitalWrite(input3,LOW);
digitalWrite(input4,LOW);  
delay(500);  //延时0.5秒
}
`
        Blockly.Arduino.definitions_[`define_l298n_init_left`] = `void left(){
//left 左转
digitalWrite(input1,LOW);
digitalWrite(input2,LOW);  
digitalWrite(input3,HIGH);
digitalWrite(input4,LOW);  
delay(500);  //延时0.5秒
}
`
        Blockly.Arduino.definitions_[`define_l298n_init_right`] = `void right(){
//Right 右转
digitalWrite(input1,HIGH);
digitalWrite(input2,LOW);  
digitalWrite(input3,LOW);
digitalWrite(input4,LOW);  
delay(500);  //延时0.5秒
}
`
        Blockly.Arduino.definitions_[`define_l298n_init_back`] = `void back(){
//back 向后转
digitalWrite(input1,LOW);
digitalWrite(input2,HIGH);  
digitalWrite(input3,LOW);
digitalWrite(input4,HIGH);  
delay(500);
}
`

        //初始化所有引脚为输出模式
        Blockly.Arduino.setups_['setups_l298n']=`pinMode(input1,OUTPUT);
pinMode(input2,OUTPUT);
pinMode(input3,OUTPUT);
pinMode(input4,OUTPUT);`

        return '';
    }

    Blockly.Arduino['l298n_forward'] = function (block) {
        return 'forward();\n';
    }
    Blockly.Arduino['l298n_back'] = function (block) {
        return 'back();\n';
    }
    Blockly.Arduino['l298n_left'] = function (block) {
        return 'left();\n';
    }
    Blockly.Arduino['l298n_right'] = function (block) {
        return 'right();\n';
    }
    Blockly.Arduino['l298n_stop'] = function (block) {
        return 'stop();\n';
    }
    // Blockly.Arduino['dht_readTemperature'] = function (block) {
    //     let no = Blockly.Arduino.valueToCode(this, 'no', Blockly.Arduino.ORDER_ATOMIC);
    //     let unit = this.getFieldValue('unit');
    //     return [`dht_${no}.readTemperature(${unit})`, Blockly.Arduino.ORDER_ATOMIC];
    // }

    return Blockly;
}

exports = addGenerator;
