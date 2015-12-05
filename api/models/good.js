var mongoose = require('mongoose');

var goodSchema = {
    taricCode: {type: String, required: true},
    description: {type: String},
    package: {
        quantity: Number,
        code: {type: String},
        description: {type: String}
    },
    unitGrossWight: {type: String},
    total_gross_weight: {type: String},
    unitNetWeight: {type: String},
    totalNetWeight: {type: String},
    marks: [{type: String}],
    temperature: {
        unit: {type: String},
        max: Number,
        min: Number
    },
    volume: {
        unit: {type: String},
        value: Number
    },
    situation: {type: String}
};

var schema = new mongoose.Schema(goodSchema);

// virtuals

module.exports = schema;
module.exports.goodSchema = goodSchema;
