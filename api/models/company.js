var mongoose = require("mongoose");
var PrimaryContact = require('./primaryContact');
var companySchema = {
    code: {type: String, required: true},
    name: {type: String, required: true},
    // primaryContact: {
    //   title: String,
    //   firstName: String,
    //   middleName: String,
    //   lastName: String,
    //   mobile: String,
    //   phoneHome: String,
    //   email: String,
    // },
    primaryContact: PrimaryContact.primaryContactSchema, 
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

};
var schema = new mongoose.Schema(companySchema);

// Virtuals

module.exports = schema;
module.exports.companySchema = companySchema;
