var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
  	company_id: String,
    situation: String,
    last_modification: Date,
    services: [{
      service_code: String,
      valid_from: Date,
      valid_to: Date
    }]
});

module.exports = mongoose.model('User', UserSchema);