var bodyparser = require('body-parser');
var express = require('express');
var status = require('http-status');

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