function addBlocks(Blockly) {
    var color_sensor = '#28BFE6';

    Blockly.Blocks.motorDriverBoard_dht11 = {
        init: function () {
            this.setColour(color_sensor);
            this.appendDummyInput("")
                .appendField(Blockly.Msg.MOTORDRIVERBOARD_DHT)
                .appendField(new Blockly.FieldDropdown([
                    ['P1', "P1"],
                    ['P2', "P2"],
                    ['P3', "P3"],
                    ['P4', "P4"],
                    ['P9', "P9"],
                    ['P10', "P10"],
                    ['P11', "P11"],
                    ['P12', "P12"]
                ]), "dht11")
                .appendField(Blockly.Msg.MOTORDRIVERBOARD_READDHT)
                .appendField(new Blockly.FieldDropdown([
                    ['temperature', "temperature"],
                    ['humidity', "humidity"],
                ]), "temhum")
            this.setOutputShape(Blockly.OUTPUT_SHAPE_ROUND);
            this.setOutput(true, 'Number');
            this.setTooltip('');
        }
    };
    return Blockly;
}

exports = addBlocks;
