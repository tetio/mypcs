// var bcrypt = require('bcrypt-nodejs');

var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
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
});

UserSchema.methods.toJSON = function () {
    var user = this.toObject();
    delete user.password;
    delete user.__v;

    return user;
};


module.exports = mongoose.model('User', UserSchema);