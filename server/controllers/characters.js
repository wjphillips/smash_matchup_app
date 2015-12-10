var fs = require('fs');
var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost', 
	user: 'root',
	password: 'root',
	database: 'smash_app'
});

module.exports = {
	return_all_characters: function(req, res) {
		connection.query('SELECT * FROM characters ORDER BY name ASC', function(err, rows) {
			if (err) throw err;
			res.render('characters', {characters: rows});
		})
	},
	show_base_character: function(req, res) {
		var selected_character_id = req.params.id;
		connection.query('SELECT * FROM characters ORDER BY name ASC', function(err, rows) {
			if (err) throw err;
			res.render('base_character', {characters: rows, selected_character_id: selected_character_id});
		})
	}
};