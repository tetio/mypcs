var mongoose = require('mongoose');

var Company = require('./company');
var Equipment = require('./equipment');
var Good = require('./good');
var SplitGoodsPlacement = require('./splitGoodsPlacement');



var exportFileSchema = {
    createdOn: {type: Date, required: true},
    modifiedOn: {type: Date, required: true},
    fileType: {type: String, required: true},
    fileOwner: {type: String, required: true},
    shippingAgent: Company.companySchema,
    freightForwarder: Company.companySchema,
    containerTerminal: Company.companySchema,
    containerDepot: Company.companySchema,
    shipper: {type: Company.companySchema, required: false},
    consignee: {type: Company.companySchema, required: false},
    notify: {type: Company.companySchema, required: false},
    carrier: {type: Company.companySchema, required: false},
    haulier: {type: Company.companySchema, required: false},
    bookingInfo: {
        bookingNumber: {type: String, required: true},
        events: {
            requestedOn: {type: Date, required: false},
            notifiedOn: {type: Date, required: false}
        },
    },
    freightForwarderInfo: {
        dossierReference: {type: String, required: false},
        bookingObservations: {type: String, required: false}
    },
    equipments: [Equipment.equipmentSchema],
    goods: [Good.goodSchema],
    splitGoodsPlacement: [SplitGoodsPlacement.splitGoodsPlacementSchema]
};

var schema = new mongoose.Schema(exportFileSchema);

schema.statics.findAndModify = function (query, sort, doc, options, callback) {
  return this.collection.findAndModify(query, sort, doc, options, callback);
};


schema.statics.initializeOrderedBulkOp = function () {
  return this.collection.initializeOrderedBulkOp();
};

module.exports = schema;
module.exports.exportFileSchema = exportFileSchema;
