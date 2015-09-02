var mongoose = require("mongoose");

var CompanySchema = new mongoose.Schema({
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
      address_title: String,
      address: String,
      city: String,
      region: String,
      postal_code: String,
      country: String,
      fax: String      
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

module.exports = mongoose.model('Company', CompanySchema);
