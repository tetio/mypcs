/* global process */
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();

// Handlers
var CompanyHandler = require('./handlers/companyHandler');
var companyHandler = new CompanyHandler();
var UserHandler = require('./handlers/userHandler');
var userHandler = new UserHandler();
var ExportFile = require('./handlers/exportFileHandler');
var exportFileHandler = new ExportFile();

// Mongo and Mongoose
var mongoose = require('mongoose');
var dbURI = require("./config/env.json")[process.env.NODE_ENV || 'development']["MONGO_URI"];
var dbOptions = { server: { socketOptions: { keepAlive: 1 } } };
mongoose.connect(dbURI, dbOptions);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));


// Development port is set here
var myPort = process.env.PORT || 6161;

// Express middleware to populate 'req.body' so we can access POST variables
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// Application routes
router.get('/', function(req, res) {
    res.json({message: 'Up and ready!'});
});

router.route('/company')
    .get(function(req, res) {
        companyHandler.find(function(err, companies) {
            if (err) {
                res.send(err);
            }
           res.json(companies);
        });
    })
    .post(function(req, res) {
        companyHandler.create(function(err, company) {
            if (err) {
                res.send(err);
            }
            res.json(company);
        })
    });
router.route('/company/:company_id')
    .get(function(req, res) {
        companyHandler.findById(req.params.company_id, function(err, company) {
            if (err) {
                res.send(err);
            }
            res.json(company);
        });
    })
    .put(function(req, res) {
        companyHandler.update(req.params.company_id, req.body, function(err, company) {
            if (err) {
                res.send(err);
            }
            res.json(company);
        });
    });
router.route('/exportfile')
    .get(function(req, res) {
        exportFileHandler.find(function(err, exportFiles) {
            if (err) {
                res.send(err);
            }
           res.json(exportFiles);
        });
    })
    .post(function(req, res) {
        exportFileHandler.create(function(err, exportFile) {
            if (err) {
                res.send(err);
            }
            res.json(exportFile);
        })
    });

// User routes
router.route('/user')
    .get(function(req, res) {
        userHandler.find(function(err, users) {
            if (err) {
                res.send(err);
            }
           res.json(users);
        });
    })
    .post(function (req, res) {
        var companyCode = req.body.company_code;
        userHandler.create(companyCode, function(err, user) {
            if (err) {
                res.send(err);
            }
            res.json(user);
        })
    });
router.route('/company/:username')
    .get(function(req, res) {
        companyHandler.findByUsername(req.params.username, function(err, user) {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    })
    .put(function(req, res) {
        userHandler.update(req.params.username, req.body, function(err, user) {
            if (err) {
                res.send(err);
            }
            res.json(user);
        });
    });
app.use('/api', router);

app.listen(myPort);
console.log('mypcs api is listening on port ' + myPort);
