var mongoose = require("mongoose");

var primaryContactSchema = {
      title: String,
      firstName: String,
      middleName: String,
      lastName: String,
      mobile: String,
      phoneHome: String,
      email: String,
};
var schema = new mongoose.Schema(primaryContactSchema);

// Virtuals

module.exports = schema;
module.exports.primaryContactSchema = primaryContactSchema;
