var mongoose = require("mongoose");

var CompanySchema = new mongoose.Schema({
    code: String,
    name: String,
    primaryContact: {
      title: String,
      firstName: String,
      middleName: String,
      lastName: String,
      mobile: String,
      phoneHome: String,
      email: String,
    },
    web: String,
    email: String,
    addressTitle: String,
    address: String,
    city: String,
    region: String,
    postalCode: String,
    country: String,
    phone: String,
    fax: String,
    situation: String,
    lastModification: Date,
    services: [{
      serviceCode: String,
      validFrom: Date,
      validTo: Date
    }]

});

module.exports = mongoose.model('Company', CompanySchema);
