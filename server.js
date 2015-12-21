var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var app = express();

app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, "./client/static")));
app.use(session({secret: 'no Johns.'}));
app.set('views', path.join(__dirname, './client/views'));
app.set('view engine', 'ejs');

require('./server/config/mysql.js');

var routes_setter = require('./server/config/routes.js');
routes_setter(app);

var server = app.listen(8001, function() {
	console.log("Listening on port 8001");
});