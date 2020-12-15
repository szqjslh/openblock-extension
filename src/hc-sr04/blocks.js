function addBlocks(Blockly) {
    var color = '#708090';
    const dhtIconUrl=""//可添加base64图片
    
    Blockly.Blocks['hc_sr04_read_distance'] = {
        init: function () {
            this.jsonInit({
                // "message0": "%1",
                "message0": Blockly.Msg.HC_SR04_READ_DISTANCE,
                //  "args0": [
                //     {
                //         "type": "field_image",
                //         "src": dhtIconUrl,
                //         "width": 50,
                //         "height": 27
                //     }
                // ],
                "args0": [
                {
                    "type": "field_dropdown",
                    "name": "trig_pin",
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
                }, 
                {
                    "type": "field_dropdown",
                    "name": "echo_pin",
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
                }
                ],
                "programMode": ['upload'],
                "colour": color,
                "extensions": ["output_number"]
            });
        }
    };


    return Blockly;
}

exports = addBlocks;
