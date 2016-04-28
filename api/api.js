var bodyparser = require('body-parser');
var express = require('express');
var status = require('http-status');

module.exports = function(wagner) {
    var api = express.Router();

    api.use(bodyparser.json());

    api.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers",
            "Origin, X-Requested-With, Content-Type, Accept");
        next(); // make sure we go to the next routes and don't stop here
    });


    api.get('/', function(req, res) {
        res.json({
            message: 'Up and ready!'
        });
    });


    api.get('/company', wagner.invoke(function(CompanyHandler) {
        return function(req, res) {
            CompanyHandler.find(handleMany.bind(null, res));
        };
    }));
    api.post('/company', wagner.invoke(function(CompanyHandler) {
        return function(req, res) {
            if (req.body._id) {
                CompanyHandler.update({ _id: req.body._id }, req.body, handleOne.bind(null, res));
            } else {
                CompanyHandler.createCompany(handleOne.bind(null, res));
                /* OK
                var company = CompanyHandler.createCompany();
                company.save(handleOne.bind(null, res));
                */
                // Company.update({ _id: company._id }, company, { new: true, upsert: true}).exec(handleOne.bind(null, res));

            }
        };
    }));


    api.get('/company/:company_id', wagner.invoke(function(CompanyHandler) {
        return function(req, res) {
            CompanyHandler.findById(req.params.company_id, handleOne.bind(null, res));
            // Company.find({ '_id': req.params.company_id }).exec(handleOne.bind(null, 'company', res));
        };
    }));




    // No used
    api.put('/company/:company_id', wagner.invoke(function(CompanyHandler) {
        return function(req, res) {
            //CompanyHandler.update(req.params.company_id, req.body, handleOne.bind(null, 'company', res));
            CompanyHandler.update({ _id: req.params.company_id }, req.body, handleOne.bind(null, res));
        };
    }));


    // Export Files
    api.get('/exportfile', wagner.invoke(function(ExportFileHandler) {
        return function(req, res) {
            ExportFileHandler.find(handleMany.bind(null, res));
        };
    }));

   api.get('/exportfile/:exportfile_id', wagner.invoke(function(ExportFileHandler) {
        return function (req, res) {
        //    ExportFile.findById(req.params.exportfile_id).exec(handleOne.bind(null, res));
           ExportFileHandler.findById(req.params.exportfile_id, handleOne.bind(null, res));
        };
    }));

   api.post('/exportfile/create', wagner.invoke(function(ExportFileHandler) {
        return function (req, res) {
        //    ExportFile.findById(req.params.exportfile_id).exec(handleOne.bind(null, res));
           ExportFileHandler.create(handleOne.bind(null, res));
        };
    }));

    return api;
};

function handleMany(res, error, result) {
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
    res.json(result);
}

function handleOne(res, error, result) {
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
    res.json(result);
}




