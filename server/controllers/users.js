var fs = require('fs');
var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost', 
	user: 'root',
	password: 'root',
	database: 'smash_app'
});

module.exports = {
	create: function(req, res) {
		console.log("New User Requested: " + JSON.stringify(req.body, null, 4));
		var errors = [];
		errors.push("TEST ERROR");
		console.log(errors);
		res.redirect('/register');
	}
}