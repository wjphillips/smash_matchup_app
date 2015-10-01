var mysql = require('mysql');
var fs = require('fs');

module.exports = function() {
	return {
		connection: mysql.createConnection({
			host: 'localhost', 
			user: 'root',
			password: 'root',
			database: 'smash_app'
		}),
		test: "hello"
	}
};
// connection.query('SELECT * FROM characters', function(err, rows, fields) {
// 	if (err) throw err;
// 	console.log(rows);
// });

// connection.end();