var mysql = require('mysql');
var fs = require('fs');
var connection = mysql.createConnection({
	host: 'localhost', 
	user: 'root',
	password: 'root',
	database: 'smash_app'
});
connection.connect();

module.exports = (function() {
	return {
		get_character_names: connection.query('SELECT name FROM characters', function(err, rows, fields) {
			if (err) throw err;
			return rows;
		})
	}
})();