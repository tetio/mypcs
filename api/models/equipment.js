var mongoose = require('mongoose');

var equipmentSchema = {
    number: {type: String, required: true},
    reference: {type: String},
    type: {type: String},
    seals: [{type: String}],
    unitGrossWight: {type: String},
    totalGrossWeight: {type: Number},
    unitNetWeight: {type: String},
    totalNetWeight: {type: Number},
    events: {
        ingateEstimated: {type: Date},
        ingateDatetime: {type: Date},
        unloadedDatetime: {type: Date},
        loadedDatetime: {type: Date}
    },
    reefer_info: {
        airFlowVolume: {type: String},
        co2Level: {type: String},
        n2Level: {type: String},
        o2Level: {type: String},
        humidityPercentage: {type: String},
        ventsTerminal: {type: String},
        ventsDepot: {type: String}
    }
};
var schema = new mongoose.Schema(equipmentSchema);

// -- virtuals

module.exports = schema;
module.exports.equipmentSchema = equipmentSchema;
