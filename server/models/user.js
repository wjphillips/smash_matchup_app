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
		connection.query('INSERT INTO users (first_name, last_name, email, hash, alias) VALUES (?, ?, ?, ?, ?)', [userInfo.first_name, userInfo.last_name, userInfo.email, userInfo.hash, userInfo.alias], function(err, rows) {
			if(err){
				console.log("There was an error.");
			}
			else{
				console.log("User was created successfully.");
			}
		});
	}
};