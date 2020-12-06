function addBlocks(Blockly) {
    var color = '#28BFE6';

    Blockly.Blocks['DHT_INIT'] = {
        init: function () {
            this.jsonInit({
                "message0": Blockly.Msg.DHT_INIT,
                "args0": [{
                    "type": "input_value",
                    "name": "no"
                }, {
                    "type": "field_dropdown",
                    "name": "pin",
                    "options": [
                        ['0', '0'],
                        ['1', '1'],
                        ['2', '2'],
                        ['3', '3'],
                        ['4', '4'],
                        ['5', '5'],
                        ['6', '6'],
                        ['7', '7'],
                        ['8', '8'],
                        ['9', '9'],
                        ['10', '10'],
                        ['11', '11'],
                        ['12', '12'],
                        ['13', '13'],
                        ['A0', 'A0'],
                        ['A1', 'A1'],
                        ['A2', 'A2'],
                        ['A3', 'A3'],
                        ['A4', 'A4'],
                        ['A5', 'A5']]
                }, {
                    "type": "field_dropdown",
                    "name": "mode",
                    "options": [
                        ['dht11', '11'],
                        ['dht21', '21'],
                        ['dht22', '22']]
                }],
                "colour": color,
                "extensions": ["shape_statement"]
            });
        }
    };

    Blockly.Blocks['DHT_READ_HUMIDITY'] = {
        init: function () {
            this.jsonInit({
                "message0": Blockly.Msg.DHT_READ_HUMIDITY,
                "args0": [{
                    "type": "input_value",
                    "name": "no"
                }],
                "colour": color,
                "extensions": ["output_number"]
            });
        }
    };

    Blockly.Blocks['DHT_READ_TEMPERATURE'] = {
        init: function () {
            this.jsonInit({
                "message0": Blockly.Msg.DHT_READ_TEMPERATURE,
                "args0": [{
                    "type": "input_value",
                    "name": "no"
                }, {
                    "type": "field_dropdown",
                    "name": "unit",
                    "options": [
                        ['℃', 'false'],
                        ['℉', 'true'],]
                },],
                "colour": color,
                "extensions": ["output_number"]
            });
        }
    };
    return Blockly;
}

exports = addBlocks;
