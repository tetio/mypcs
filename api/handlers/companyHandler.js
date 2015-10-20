// models
var Company = require('../models/company');
// Load Chance
var Chance = require('chance');
// Instantiate Chance so it can be used
var chance = new Chance();


function CompanyHandler() {

    this.findById = function (id, next) {
        Company.findById(id, function (err, company) {
            if (err) {
                next(err);
            }
            next(null, company);
        });
    };

    this.find = function (next) {
        Company.find(function (err, companies) {
            if (err) {
                next(err);
            }
            next(null, companies);
        });
    };

    this.create = function (next) {
        var company = new Company();
        company.code = chance.state() + chance.zip();
        company.name = chance.name();
        var domain = company.name.replace(' ', '').toLocaleLowerCase() + '.com';
        company.web = 'www.' + domain;
        company.email = 'contact@' + domain;
        company.name = company.name + " Ltd.";
        company.address = chance.address();
        company.city = chance.city();
        company.region = chance.province({ full: true });
        company.country = chance.country({ full: true });
        company.postalCode = chance.postal();
        company.phone = chance.phone();
        company.fax = chance.phone();
        company.situation = 'A';
        company.lastModification = new Date();
        var first = chance.first();
        var last = chance.last();
        var contact = {
            firstName: first,
            lastName: last,
            mobile: chance.phone(),
            email: first.toLocaleLowerCase() + '.' + last.toLocaleLowerCase() + '@' + domain
        };
        company.primaryContact = contact;
        company.save(function (err) {
            if (err) {
                next(err);
            }
            next(company);
        });
    };

    this.update = function (id, json, next) {
        var company = new Company(json);
        console.log(id + "===" + company._id);
        if (id === company._id) {
            company.last_modification = new Date();
            Company.update({ _id: company._id }, company, { upsert: false }, function (err) {
                if (err) {
                    next(err);
                }
                next(null, company);
            });
        } else {
            next();
        }
    };
}

module.exports = CompanyHandler;
