var mongoose = require('mongoose');
var _ = require('lodash');
var CompanyHandler = require('./handlers/companyHandler');
var ExportFileHandler = require('./handlers/exportFileHandler');

module.exports = function (wagner) {
    // Init mongoose
    var dbURI = require("./config/env.json")[process.env.NODE_ENV || 'local']["MONGO_URI"];
    var dbOptions = {
        server: {
            socketOptions: {
                keepAlive: 1
            }
        }
    };
    mongoose.connect(dbURI, dbOptions);

    // Models & Handlers
    var company = mongoose.model('Company', require('./models/company'));
    var exportFile = mongoose.model('ExportFile', require('./models/exportFile'));
    var companyHandler = new CompanyHandler(company);
    var exportFileHandler = new ExportFileHandler(exportFile);

    var handlers = {
        CompanyHandler: companyHandler,
        ExportFileHandler: exportFileHandler
    };

    _.each(handlers, function (value, key) {
        wagner.factory(key, function() {
            return value;
        });
    });
};
