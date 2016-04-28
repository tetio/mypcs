var express = require('express');
var wagner = require('wagner-core');

require('./model')(wagner);

var app = express();

app.use('/api/v1', require('./api')(wagner));

app.listen(6161);
console.log('Listening on port 6161!');
