var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost', 
	user: 'root',
	password: 'root',
	database: 'smash_app'
});
connection.connect();

// connection.query('SELECT name FROM characters', function(err, rows, fields) {
// 	if (err) throw err;
// 	console.log(rows);
// });

connection.end();