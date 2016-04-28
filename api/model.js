var mongoose = require('mongoose');
var _ = require('underscore');
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

    // The models
    var company = mongoose.model('Company', require('./models/company'), 'companies');
    var exportFile = mongoose.model('ExportFile', require('./models/exportFile'), 'exportFiles');
    var companyHandler = new CompanyHandler();
    var exportFileHandler = new ExportFileHandler();

    var models = {
        Company: company,
        ExportFile: exportFile,
        CompanyHandler: companyHandler,
        ExportFileHandler: exportFileHandler
    };

    _.each(models, function (value, key) {
        wagner.factory(key, function() {
            return value;
        });
    });
};
