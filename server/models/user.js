var fs = require('fs');
var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost', 
	user: 'root',
	password: 'root',
	database: 'smash_app'
});

module.exports = {
	addNew: function(req, res, userInfo) {
		console.log("userInfo: " + userInfo);
	},
	findByAlias: function(req, res, alias) {
		
	}
};