var fs = require('fs');
var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost', 
	user: 'root',
	password: 'root',
	database: 'smash_app'
});

//CONTROLLER METHODS//
module.exports = {
	show_matchup_by_id: function(req, res) {
		var matchupId = req.params.id;
		connection.query('SELECT * FROM match_ups m JOIN characters c1 on m.character1_id = c1.id JOIN characters c2 on m.character2_id = c2.id WHERE m.id = ?', [matchupId], function(err, rows) {
			if (err) throw err;
			console.log("Query Results: " + rows);
			res.render('matchup_by_id', {matchup_data: rows});
		});
	},
	show_matchup_by_chars: function(req, res) {
		connection.query('SELECT m.id as matchup_id, c1.id as char1_id, c1.name as char1_name, t.id as tip_id, t.content as tip_content, t.vote_count as vote_count, t.created_at as tip_created_date, t.character_id as tip_character_id, c1.image as char1_image, c2.id as char2_id, c2.name as char2_name, c2.image as char2_image, u.alias as tip_user_alias FROM match_ups m JOIN characters c1 on m.character1_id = c1.id JOIN characters c2 on m.character2_id = c2.id JOIN tips t on m.id = t.match_up_id JOIN users u on t.user_id = u.id WHERE (character1_id = ? AND character2_id = ?) OR (character1_id = ? AND character2_id = ?) ORDER BY tip_created_date DESC', [req.body.base_char_id, req.body.matchup_char_id, req.body.matchup_char_id, req.body.base_char_id], function(err, rows) {
			if(err) {
				console.log("There was an error: " + err);
				res.redirect('/characters/' + req.body.base_char_id);
			}
			else if(rows.length != 0){
				console.log("DB Returned: " + rows.length + " row(s).");
				console.log("Data Returned: " + rows[0]);
				res.render('matchup', {matchup_data: rows});
			}
			else{
				console.log("No matchup was found. Attempting to create.");
				res.redirect('/new_matchup/' + req.body.base_char_id + "/" + req.body.matchup_char_id);
			};
		});
	},
	create: function(req, res) {
		console.log(req.params);
		connection.query('INSERT INTO match_ups(character1_id, character2_id) VALUES (?, ?)', [req.params.id1, req.params.id2], function(err) {
			if(err){
				console.log("There was an error: " + err);
				res.redirect('/');
			}
			else{
				console.log("Matchup created successfully.");
				connection.query('SELECT m.id as matchup_id, c1.id as char1_id, c1.name as char1_name, c1.image as char1_image, c2.id as char2_id, c2.name as char2_name, c2.image as char2_image FROM match_ups m JOIN characters c1 on m.character1_id = c1.id JOIN characters c2 on m.character2_id = c2.id ORDER BY m.id DESC LIMIT 1', function(err, rows) {
					if(err){
						console.log("There was an error: " + err);
					}
					else{
						res.render('matchup', {matchup_data: rows});
					}
				});
			};
		});
	}
};