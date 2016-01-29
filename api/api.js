var bodyparser = require('body-parser');
var express = require('express');
var status = require('http-status');
// var CompanyHandler = require('./handlers/companyHandler');
// var companyHandler = new CompanyHandler();

module.exports = function (wagner) {
    var api = express.Router();

    api.use(bodyparser.json());

    api.get('/', function (req, res) {
        res.json({
            message: 'Up and ready!'
        });
    });

    api.get('/company', wagner.invoke(function(Company) {
        return function (req, res) {
            Company.find().exec(handleMany.bind(null, 'companies', res));
        };
    }));

    api.get('/company/:company_id', wagner.invoke(function(Company) {
        return function (req, res) {
            Company.find({'_id': req.params.company_id}).exec(handleOne.bind(null, 'company', res));
        };
    }));

    api.put('/company', wagner.invoke(function(CompanyHandler) {
        return function (req, res) {
          CompanyHandler.create(function(err, company) {
              if (err) {
                  res.send(err);
              }
              res.json(company);
          });
        };
    }));


    return api;
};

function handleMany(property, res, error, result) {
  if (error) {
    return res.
      status(status.INTERNAL_SERVER_ERROR).
      json({ error: error.toString() });
  }

  var json = {};
  json[property] = result;
  res.json(json);
}

function handleOne(property, res, error, result) {
  if (error) {
    return res.
      status(status.INTERNAL_SERVER_ERROR).
      json({ error: error.toString() });
  }
  if (!result) {
    return res.
      status(status.NOT_FOUND).
      json({ error: 'Not found' });
  }

  var json = {};
  json[property] = result;
  res.json(json);
}
