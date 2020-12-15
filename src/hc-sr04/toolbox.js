function addToolbox() {
    const dhtIconUrl = '';//传入base64

    return `<category name="%{BKY_HC_SR04_CATEGORY}" id="HC_SR04_CATEGORY" colour="#708090" secondaryColour="#708090" iconURI="">
                <block type="hc_sr04_read_distance" id="hc_sr04_read_distance">
                    <field name="trig_pin">13</field>
                    <field name="echo_pin">12</field>
                </block>     
            </category>
            `;
}
exports = addToolbox;