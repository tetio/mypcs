var mongoose = require('mongoose');

var splitGoodsPlacementSchema = {
    equipmentNumber: {type: String, required: true},
    packageQuantity: {type: Number, required: false},
    grossWeight: {type: Number, required: false}
};

var schema = new mongoose.Schema(splitGoodsPlacementSchema);

// Virtuals

module.exports = schema;
module.exports.splitGoodsPlacementSchema = splitGoodsPlacementSchema;
