var mongoose = require("mongoose");

var PackageSchema = new mongoose.Schema({
  quantity: Number,
  type: String,
  description: String
});

module.exports = mongoose.model('Package', PackageSchema);
