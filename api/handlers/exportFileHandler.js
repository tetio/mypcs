var Promise = require('bluebird');

// models
var ExportFile = require('../models/exportFile');
var Company = require('../models/company');
// Load Chance
var Chance = require('chance');
// Instantiate Chance so it can be used
var chance = new Chance();


function ExportFileHandler() {

    this.findById = function (id, next) {
        ExportFile.findById(id, function (err, exportFile) {
            if (err) {
                next(err);
            }
            next(null, exportFile);
        });
    };

    this.find = function (next) {
        ExportFile.find(function (err, exportFiles) {
            if (err) {
                next(err);
            }
            next(null, exportFiles);
        });
    };

    this.create = function (next) {
        var exportFile = new ExportFile();
        countCompanies().then(function(count) {
            Promise.join(findOneCompany(count), findOneCompany(count), findOneCompany(count), findOneCompany(count), function(forwarder, shippingAgent, terminal, depot) {
                exportFile.shipping_agent = company2Nad(shippingAgent);
                exportFile.freight_forwarder = company2Nad(forwarder);
                exportFile.container_terminal = company2Nad(terminal);
                exportFile.container_depot = company2Nad(depot);
                exportFile.booking_number = chance.postal().replace(' ', '');
                var numEquip = Math.floor(Math.random() * 5);
                console.log('numEquip='+numEquip);
                for (var i = 0; i < numEquip; i++) {
                    var equipment = {
                        number: "MMMU"+chance.integer({min: 1000000, max: 9999999}),
                        reference: "ref1",
                        type: "2200",
                        unit_gross_wight: "KG",
                        total_gross_weight: chance.integer({min: 13000, max: 13999}),
                        unit_net_weight: "KG",
                        total_net_weight: chance.integer({min: 12000, max: 12999})
                    };
                    exportFile.equipments.push(equipment);
                }
                exportFile.save(function (err) {
                    if (err) {
                        next(err);
                    }
                    next(exportFile);
                });
            });
        });
    };

    this.update = function (id, json, next) {
        var exportFile = ExportFile(json);
        exportFile.log(id + "===" + company._id);
        if (id == exportFile._id) {
            exportFile.last_modification = new Date();
            Company.update({ _id: exportFile._id }, exportFile, { upsert: false }, function (err) {
                if (err) {
                    next(err);
                }
                next(null, exportFile);
            });
        } else {
            next();
        }
    };

    function findOneCompany(count) {
        return new Promise(function(resolve, reject) {
            var rand = Math.floor(Math.random() * count);
            Company.findOne().skip(rand).exec(function (err, company) {
                if (err) {
                    reject(err);
                }
                resolve(company);
            });
        });
    }

    function countCompanies() {
        return new Promise(function(resolve, reject) {
            ExportFile.count({}, function (err, count) {
                if (err) {
                    reject(err);
                }
                resolve(count);
            });
        });
    }


    function company2Nad(company) {
        var nad = {
            code: company.code,
            name: company.name,
            email: company.email,
            address_title: company.address_title,
            address: company.address,
            city: company.city,
            region: company.region,
            postal_code: company.postal_code,
            country: company.country,
            phone: company.phone,
            fax: company.fax
        };
        return nad;
    }
}

module.exports = ExportFileHandler;