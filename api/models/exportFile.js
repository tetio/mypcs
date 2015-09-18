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


var Good = new mongoose.Schema({
    taric_code: String,
    description: String
});

var DangerousGood = new mongoose.Schema({
    type: String,
    class: String
});



var ExportFileSchema = new mongoose.Schema({
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
            request_datetime: Date,
            notification_datetime: Date
        },
    },
    freight_forwarder_info: {
        dossier_reference: String,
        booking_observations: String
    },
    equipments: [Equipment],
    goods: [Good],
    dangerous_goods: [DangerousGood]
});

module.exports = mongoose.model('ExportFile', ExportFileSchema);
