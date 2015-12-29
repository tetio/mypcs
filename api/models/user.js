var mongoose = require("mongoose");

var userSchema = {
    username: String,
    password: String,
  	company_code: String,
    situation: String,
    last_modification: Date,
    services: [{
      service_code: String,
      valid_from: Date,
      valid_to: Date
    }]
};

var schema = mongoose.Schema(userSchema);


schema.methods.toJSON = function () {
    var user = this.toObject();
    delete user.password;
    delete user.__v;

    return user;
};


module.exports = schema;
module.exports.userSchema = userSchema;