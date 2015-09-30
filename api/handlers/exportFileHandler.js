var Promise = require('bluebird');
// models
var ExportFile = require('../models/exportFile');
var Company = require('../models/company');
// Load Chance
var Chance = require('chance');
// Instantiate Chance so it can be used
var chance = new Chance();

function ExportFileHandler() {


	// {"file_owner": "WA92828", "booking_number": "BK-B6O2J1"}
	// {"file_owner": "CT28709", "booking_number": "BK-A9F4C4", "equipment_number": "MMMU9953715"}
	// db.getCollection('exportfiles').createIndex({'file_owner': 1})
	// db.getCollection('exportfiles').createIndex({'booking_info.booking_number': 1})
	// db.getCollection('exportfiles').createIndex({'equipments.number': 1})
	// db.getCollection('exportfiles').createIndex({'modified_at': 1})
	// db.getCollection('exportfiles').find( {$and: [{file_owner: 'OK07913'}, {modified_at: {$gt: new Date(2005,0,1)}}, {modified_at: {$lt: new Date(2015,8,31)}}]})
    // db.getCollection('exportfiles').find({file_owner: 'OK07913', modified_at: {$gt: new Date(2005,0,1)}, modified_at: {$lt: new Date(2015,8,31)}})


	this.findByCriteria = function (criterias, next) {
		var queryCriteria = {};
		if (criterias.file_owner !== undefined) {
			queryCriteria.file_owner = criterias.file_owner;
		}
		if (criterias.booking_number !== undefined) {
			queryCriteria['booking_info.booking_number'] = criterias.booking_number;
		}
		if (criterias.equipment_number !== undefined) {
			queryCriteria['equipments.number'] = criterias.equipment_number;
		}
		queryCriteria.modified_at = {$gt: new Date(2005,0,1)};
		queryCriteria.modified_at = {$lt: new Date()};
		console.log(queryCriteria);
		ExportFile.find(queryCriteria).limit(10).exec(function (err, exportFiles) {
			if (err) {
				next(err);
			}
			next(null, exportFiles);
		});
	};


	this.findById = function (id, next) {
		ExportFile.findById(id, function (err, exportFile) {
			if (err) {
				next(err);
			}
			next(null, exportFile);
		});
	};





	// Search all limited to 20
	this.find = function (next) {
		ExportFile.find().limit(20).exec(function (err, exportFiles) {
			if (err) {
				next(err);
			}
			next(null, exportFiles);
		});
	};

	this.create = function (next) {
		var exportFile = new ExportFile();
		countCompanies().then(function(count) {
			Promise.join(findOneCompany(count), findOneCompany(count),
			findOneCompany(count), findOneCompany(count),
			function(forwarder, shippingAgent, terminal, depot) {
				exportFile.shipping_agent = company2Nad(shippingAgent);
				exportFile.freight_forwarder = company2Nad(forwarder);
				exportFile.container_terminal = company2Nad(terminal);
				exportFile.container_depot = company2Nad(depot);
				// equipments
				var numEquip = Math.floor(Math.random() * 4)+1;
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
				// Goods
				for (var j = 0; j < numEquip; j++) {
					var good = {
						taric_code: ''+chance.integer({min: 5000000, max: 9999999}),
						description: "TEXTILES_"+j,
						package: {
							quantity: j+10,
							code: 'BR',
							description: 'BARRIL'
						},
						situation: 'A',
						split_goods_placement: [{
							equipment_number: exportFile.equipments[j].number,
							package_quantity: (j+20),
							gross_weight: (22000+(j+20)*10),
							_id: exportFile.equipments[j]._id
						}]
					};
					exportFile.goods.push(good);
				}
                exportFile.booking_info = {
                    booking_number: 'BK-'+chance.postal().replace(' ', ''),
                    events: {
                            notified_at: newDate()
                    }
                };
                exportFile.created_at = newDate();
                exportFile.modified_at = exportFile.created_at;
                exportFile.file_type = 'EF_FF';
                exportFile.file_owner = exportFile.freight_forwarder.code;
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
		var exportFile = new ExportFile(json);
		exportFile.log(id + "===" + exportFile._id);
		if (id === exportFile._id) {
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
			Company.count({}, function (err, count) {
				if (err) {
					reject(err);
				}
				resolve(count);
			});
		});
	}

    function newDate() {
        return new Date(
            chance.integer({min: 2005, max: 2015}),
            chance.integer({min: 0, max: 11}),
            chance.integer({min: 1, max: 28}),
            chance.integer({min: 0, max: 23}),
            chance.integer({min: 0, max: 59}),
            chance.integer({min: 0, max: 59}),
            chance.integer({min: 0, max: 999}));
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
