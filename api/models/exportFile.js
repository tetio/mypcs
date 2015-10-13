var mongoose = require("mongoose");

var Equipment = new mongoose.Schema({
    number: String,
    reference: String,
    type: String,
    seals: [String],
    unit_gross_wight: String,
    total_gross_weight: String,
    unit_net_weight: String,
    total_net_weight: String,
    events: {
        ingate_estimated: Date,
        ingate_datetime: Date,
        unloaded_datetime: Date,
        loaded_datetime: Date
    },
    reefer_info: {
        air_flow_volume: String,
        co2_level: String,
        n2_level: String,
        o2_level: String,
        humidity_percentage: String,
        vents_terminal: String,
        vents_depot: String
    }
});

var DangerousGood = new mongoose.Schema({
    hazard_code: {
        identification_code:String,
        additional_classification_identifier: String,
        code_version_identifier: String
    },
    united_nations_identifier: String,
    packaging_danger_level_code: String,
    emergency_procedure_for_ships_identifier: String,
    description: String,
});

var SplitGoodsPlacement = new mongoose.Schema({
    equipment_number: String,
    package_quantity: Number,
    gross_weight: Number
});

var Good = new mongoose.Schema({
    taric_code: String,
    description: String,
    package: {
        quantity: Number,
        code: String,
        description: String
    },
    unit_gross_wight: String,
    total_gross_weight: String,
    unit_net_weight: String,
    total_net_weight: String,
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
    dangerous_goods: [DangerousGood]
});

var ExportFileSchema = new mongoose.Schema({
    created_on: Date,
    modified_on: Date,
    file_type: String,
    file_owner: String,
    shipping_agent: {
        code: String,
        name: String,
        email: String,
        address_title: String,
        address: String,
        city: String,
        region: String,
        postal_code: String,
        country: String,
        phone: String,
        fax: String
    },
    freight_forwarder: {
        code: String,
        name: String,
        email: String,
        address_title: String,
        address: String,
        city: String,
        region: String,
        postal_code: String,
        country: String,
        phone: String,
        fax: String
    },
    container_terminal: {
        code: String,
        name: String,
        email: String,
        address_title: String,
        address: String,
        city: String,
        region: String,
        postal_code: String,
        country: String,
        phone: String,
        fax: String
    },
    container_depot: {
        code: String,
        name: String,
        email: String,
        address_title: String,
        address: String,
        city: String,
        region: String,
        postal_code: String,
        country: String,
        phone: String,
        fax: String
    },
    shipper: {
        code: String,
        name: String,
        email: String,
        address_title: String,
        address: String,
        city: String,
        region: String,
        postal_code: String,
        country: String,
        phone: String,
        fax: String
    },
    consignee: {
        code: String,
        name: String,
        email: String,
        address_title: String,
        address: String,
        city: String,
        region: String,
        postal_code: String,
        country: String,
        phone: String,
        fax: String
    },
    notify: {
        code: String,
        name: String,
        email: String,
        address_title: String,
        address: String,
        city: String,
        region: String,
        postal_code: String,
        country: String,
        phone: String,
        fax: String
    },
    carrier: {
        code: String,
        name: String,
        email: String,
        address_title: String,
        address: String,
        city: String,
        region: String,
        postal_code: String,
        country: String,
        phone: String,
        fax: String
    },
    haulier: {
        code: String,
        name: String,
        email: String,
        address_title: String,
        address: String,
        city: String,
        region: String,
        postal_code: String,
        country: String,
        phone: String,
        fax: String
    },
    booking_info: {
        booking_number: String,
        events: {
            requested_on: Date,
            notified_on: Date
        },
    },
    freight_forwarder_info: {
        dossier_reference: String,
        booking_observations: String
    },
    equipments: [Equipment],
    goods: [Good],
    split_goods_placement: [SplitGoodsPlacement],
    dangerous_goods: [DangerousGood]
});


ExportFileSchema.statics.findAndModify = function (query, sort, doc, options, callback) {
  return this.collection.findAndModify(query, sort, doc, options, callback);
};


ExportFileSchema.statics.initializeOrderedBulkOp = function () {
  return this.collection.initializeOrderedBulkOp();
};

module.exports = mongoose.model('ExportFile', ExportFileSchema);
