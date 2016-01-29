var mongoose = require('mongoose');
var _ = require('underscore');

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
    var Company = mongoose.model('Company', require('./models/company'), 'companies');
    var ExportFile = mongoose.model('ExportFile', require('./models/exportFile'), 'exportFiles');
    var CompanyHandler = require('./handlers/companyHandler');
    var companyHandler = new CompanyHandler();
    var ExportFile = require('./handlers/exportFileHandler');
    var exportFileHandler = new ExportFile();

    var models = {
        Company: Company,
        ExportFile: ExportFile,
        CompanyHandler: companyHandler,
        ExportFileHandler: exportFileHandler
    };

    _.each(models, function (value, key) {
        wagner.factory(key, function() {
            return value;
        });
    });
}
