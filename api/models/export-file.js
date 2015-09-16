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
    }
    reefer_info: {
        air_flow_volume: String,
        co2_level: String,
        n2_level: String,
        o2_level: String,
        humidity_percentage: String,
        vents_terminal: String,
        vents_depot: String
    },
    reference: String,
    reference: String,
    reference: String,
    reference: String,
    reference: String,
    
        
});


var Good = new mongoose.Schema({
    
});

var ExportFileSchema = new mongoose.Schema({
    code: String,
    name: String,
    primary_contact: {
      title: String,
      first_name: String,
      middle_name: String,
      last_name: String,
      mobile: String,
      phone_home: String,
      email: String,
    },
    web: String,
    email: String,
    address_title: String,
    address: String,
    city: String,
    region: String,
    postal_code: String,
    country: String,
    phone: String,
    fax: String,
    situation: String,
    last_modification: Date,
    services: [{
      service_code: String,
      valid_from: Date,
      valid_to: Date
    }]

});

module.exports = mongoose.model('ExportFile', ExportFileSchema);
