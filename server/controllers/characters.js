var fs = require('fs');
var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost', 
	user: 'root',
	password: 'root',
	database: 'smash_app'
});

// module.exports = (function() {
// 	return {
// 		get_all_character_names: connection.query('SELECT name FROM characters', function(err, rows) {
// 			if (err) throw err;
// 			return rows;
// 		})
// 	}
// })();

module.exports = {
	return_all_characters: function(req, res) {
		connection.query('SELECT * FROM characters', function(err, rows) {
			if (err) throw err;
			var characters = rows;
			res.render('characters', {characters: characters});
		})
	},
	return_hello_world: function() {
		var phrase = "hello world";
		return(phrase);
	},
	show: function(req, res) {
		connection.query('SELECT * FROM characters WHERE id = ?', req.params.id, function(err, row) {
			if (err) throw err;
			console.log(row);
			return(row);
		})
	}
};