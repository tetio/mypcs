// models
var User = require('../models/user');
// Load Chance
var Chance = require('chance');
// Instantiate Chance so it can be used
var chance = new Chance();

function UserHandler() {
    this.findById = function (id, next) {
        User.findById(id, function (err, user) {
            if (err) {
                next(err);
            }
            next(null, user);
        });
    }

    this.find = function (next) {
        User.findById(function (err, users) {
            if (err) {
                next(err);
            }
            next(null, users);
        });
    }

    this.findActive = function (next) {
        User.find({situation: 'A'}, function (err, users) {
            if (err) {
                next(err);
            }
            next(null, users);
        });
    }

    this.create = function (company, next) {
        var user = new User();
        user.username
    }

}

module.exports = UserHandler;