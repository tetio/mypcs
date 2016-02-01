var bodyparser = require('body-parser');
var express = require('express');
var status = require('http-status');

module.exports = function (wagner) {
    var api = express.Router();

    api.use(bodyparser.json());

    api.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept");
        next(); // make sure we go to the next routes and don't stop here
    });


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
    api.put('/company', wagner.invoke(function(CompanyHandler) {
        return function (req, res) {
            CompanyHandler.create(handleOne.bind(null, 'companies', res));
        };
    }));


    api.get('/company/:company_id', wagner.invoke(function(Company) {
        return function (req, res) {
            Company.find({'_id': req.params.company_id}).exec(handleOne.bind(null, 'company', res));
        };
    }));
    api.post('/company/:company_id', wagner.invoke(function(CompanyHandler) {
        return function (req, res) {
            CompanyHandler.update(req.params.company_id, req.body, handleOne.bind(null, 'company', res));
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
