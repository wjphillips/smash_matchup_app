var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, "./client/static")));

require('./server/config/routes.js');

var server = app.listen(8001, function() {
	console.log("Listening on port 8001");
});