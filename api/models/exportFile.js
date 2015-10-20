var mongoose = require("mongoose");

var Equipment = new mongoose.Schema({
    number: String,
    reference: String,
    type: String,
    seals: [String],
    unitGrossWight: String,
    totalGrossWeight: String,
    unitNetWeight: String,
    totalNetWeight: String,
    events: {
        ingateEstimated: Date,
        ingateDatetime: Date,
        unloadedDatetime: Date,
        loadedDatetime: Date
    },
    reefer_info: {
        airFlowVolume: String,
        co2Level: String,
        n2Level: String,
        o2Level: String,
        humidityPercentage: String,
        ventsTerminal: String,
        ventsDepot: String
    }
});

var DangerousGood = new mongoose.Schema({
    hazardCode: {
        identificationCode:String,
        additionalClassificationIdentifier: String,
        codeVersionIdentifier: String
    },
    unitedNationsIdentifier: String,
    packagingDangerLevelCode: String,
    emergencyProcedureForShipsIdentifier: String,
    description: String,
});

var SplitGoodsPlacement = new mongoose.Schema({
    equipmentNumber: String,
    packageQuantity: Number,
    grossWeight: Number
});

var Good = new mongoose.Schema({
    taricCode: String,
    description: String,
    package: {
        quantity: Number,
        code: String,
        description: String
    },
    unitGrossWight: String,
    total_gross_weight: String,
    unitNetWeight: String,
    totalNetWeight: String,
    marks: [String],
    temperature: {
        unit: String,
        max: Number,
        min: Number
    },
    volume: {
        unit: String,
        value: Number
    },
    situation: String,
    //split_goods_placement: [SplitGoodsPlacement],
    dangerousGoods: [DangerousGood]
});

var ExportFileSchema = new mongoose.Schema({
    createdOn: Date,
    modifiedOn: Date,
    fileType: String,
    fileOwner: String,
    shippingAgent: {
        code: String,
        name: String,
        email: String,
        addressTitle: String,
        address: String,
        city: String,
        region: String,
        postalCode: String,
        country: String,
        phone: String,
        fax: String
    },
    freightForwarder: {
        code: String,
        name: String,
        email: String,
        addressTitle: String,
        address: String,
        city: String,
        region: String,
        postalCode: String,
        country: String,
        phone: String,
        fax: String
    },
    containerTerminal: {
        code: String,
        name: String,
        email: String,
        addressTitle: String,
        address: String,
        city: String,
        region: String,
        postalCode: String,
        country: String,
        phone: String,
        fax: String
    },
    containerDepot: {
        code: String,
        name: String,
        email: String,
        addressTitle: String,
        address: String,
        city: String,
        region: String,
        postalCode: String,
        country: String,
        phone: String,
        fax: String
    },
    shipper: {
        code: String,
        name: String,
        email: String,
        addressTitle: String,
        address: String,
        city: String,
        region: String,
        postalCode: String,
        country: String,
        phone: String,
        fax: String
    },
    consignee: {
        code: String,
        name: String,
        email: String,
        addressTitle: String,
        address: String,
        city: String,
        region: String,
        postalCode: String,
        country: String,
        phone: String,
        fax: String
    },
    notify: {
        code: String,
        name: String,
        email: String,
        addressTitle: String,
        address: String,
        city: String,
        region: String,
        postalCode: String,
        country: String,
        phone: String,
        fax: String
    },
    carrier: {
        code: String,
        name: String,
        email: String,
        addressTitle: String,
        address: String,
        city: String,
        region: String,
        postalCode: String,
        country: String,
        phone: String,
        fax: String
    },
    haulier: {
        code: String,
        name: String,
        email: String,
        addressTitle: String,
        address: String,
        city: String,
        region: String,
        postalCode: String,
        country: String,
        phone: String,
        fax: String
    },
    bookingInfo: {
        bookingNumber: String,
        events: {
            requestedOn: Date,
            notifiedOn: Date
        },
    },
    freightForwarderInfo: {
        dossierReference: String,
        bookingObservations: String
    },
    equipments: [Equipment],
    goods: [Good],
    splitGoodsPlacement: [SplitGoodsPlacement],
    dangerousGoods: [DangerousGood]
});


ExportFileSchema.statics.findAndModify = function (query, sort, doc, options, callback) {
  return this.collection.findAndModify(query, sort, doc, options, callback);
};


ExportFileSchema.statics.initializeOrderedBulkOp = function () {
  return this.collection.initializeOrderedBulkOp();
};

module.exports = mongoose.model('ExportFile', ExportFileSchema);
