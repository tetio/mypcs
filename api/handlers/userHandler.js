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

    this.findByUsername = function (username, next) {
        User.find({username: username}, function (err, user) {
            if (err) {
                next(err);
            }
            next(null, user);
        });
    }


    this.find = function (next) {
        User.find(function (err, users) {
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
    // companyCode tells which company user belongs to
    this.create = function (companyCode, next) {
        var user = new User();
        var username = chance.first()+chance.last();
        user.username = username.toLocaleLowerCase();
        user.password = chance.word({ length: 10 });
        user.company_code = companyCode;
        user.situation = 'A';
        user.last_modification = new Date();

        user.save(function (err) {
            if (err) {
                next(err);
            }
            next(null, user);
        });
    }


    this.create = function (username, json, next) {
        var user = User(json);
        if (user.username == username) {
            user.last_modification = new Date();
            User.update({usermame: username}, user, {upsert: false}, function(err) {
                if (err) {
                    next(err);
                }
                next(null, user);
            });
        }
    }
}

module.exports = UserHandler;