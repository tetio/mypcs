var Promise = require('bluebird');
var expect = require('chai').expect;
var chai = require('chai');
chai.use(require('chai-string'));
var MongoClient = require('mongodb').MongoClient; // Driver for connecting to MongoDB
var WordHandler = require('../wordHandler');
var dbConnection = require("../config/env.json")[process.env.MODE_ENV || 'development']["MONGO_URI"];
var wordOK = false;
var wordKO = false;
var wordHandler;
var wOK;
var connectDB = Promise.promisify(MongoClient.connect, MongoClient);


function displayWord(word) {
  return new Promise(function(resolve, reject) {
    wordHandler.displayWord(word, function(err, word) {
      if (err) reject(err);
      resolve(word);
    });
  });
}

function init(db) {
    return new Promise(function(resolve, reject) {
        resolve(new WordHandler(db));
    });
}

describe('The company... ', function () {

  before(function(done) {
    connectDB(dbConnection)
    .then(init)
    .then(function(wh) {
      wordHandler = wh;
      Promise.join(displayWord('PATATA'), displayWord('KAKADEVAKA'), function(wOK, wKO) {
        wordOK = (wOK !== null && wOK !== undefined);
        wordKO = (wKO === null || wKO === undefined);
        done();
      });
    });
  });

  it('should exist', function() {
    expect(wordOK).to.be.true;
  });


  it('should not exist', function() {
    expect(wordKO).to.be.true;
  });

});
