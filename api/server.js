/* global process */
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();

// Handlers
var CompanyHandler = require('./handlers/companyHandler');
var companyHandler = new CompanyHandler();

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

router.use(function(req, res, next) {
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


app.use('/api', router);

app.listen(myPort);
console.log('mypcs api is listening on port '+myPort);
