var mongoose = require('mongoose');


var dangerousGoodSchema = {
    hazardCode: {
        identificationCode:{type: String},
        additionalClassificationIdentifier: {type: String},
        codeVersionIdentifier: {type: String}
    },
    unitedNationsIdentifier: {type: String},
    packagingDangerLevelCode: {type: String},
    emergencyProcedureForShipsIdentifier: {type: String},
    description: {type: String},
};

var schema = new mongoose.Schema(dangerousGoodSchema);

module.exports = schema;
module.exports.dangerousGoodSchema = dangerousGoodSchema;