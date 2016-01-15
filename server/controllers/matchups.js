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
		connection.query('SELECT m.id as matchup_id, count(distinct v.user_id) as matchup_vote_total, count(distinct v1.user_id) as char1_vote_count, count(distinct v2.user_id) as char2_vote_count, c1.id as char1_id, c1.name as char1_name, t.id as tip_id, t.content as tip_content, t.vote_count as like_count, t.created_at as tip_created_date, t.character_id as tip_character_id, c1.image as char1_image, c2.id as char2_id, c2.name as char2_name, c2.image as char2_image, u.alias as tip_user_alias, l.id as like_id, l.user_id as liked_by_id FROM match_ups m JOIN characters c1 on m.character1_id = c1.id JOIN characters c2 on m.character2_id = c2.id LEFT JOIN tips t on m.id = t.match_up_id LEFT JOIN users u on t.user_id = u.id LEFT JOIN likes l on t.id = l.tip_id LEFT JOIN votes v1 on v1.character_id = c1.id LEFT JOIN votes v2 on v2.character_id = c2.id LEFT JOIN votes v on v.match_up_id = m.id WHERE m.id = ? GROUP BY tip_content ORDER BY vote_count DESC', [matchupId], function(err, rows) {
			if (err){
				console.log("There was an error.");
			}
			else{
				res.render('matchup', {matchup_data: rows, session: req.session});
			}
		});
	},
	show_matchup_by_chars: function(req, res) {
		connection.query('SELECT m.id as matchup_id, count(distinct v.user_id) as matchup_vote_total, count(distinct v1.user_id) as char1_vote_count, count(distinct v2.user_id) as char2_vote_count, c1.id as char1_id, c1.name as char1_name, t.id as tip_id, t.content as tip_content, t.vote_count as like_count, t.created_at as tip_created_date, t.character_id as tip_character_id, c1.image as char1_image, c2.id as char2_id, c2.name as char2_name, c2.image as char2_image, u.alias as tip_user_alias, l.id as like_id, l.user_id as liked_by_id FROM match_ups m JOIN characters c1 on m.character1_id = c1.id JOIN characters c2 on m.character2_id = c2.id LEFT JOIN tips t on m.id = t.match_up_id LEFT JOIN users u on t.user_id = u.id LEFT JOIN likes l on t.id = l.tip_id LEFT JOIN votes v1 on v1.character_id = c1.id LEFT JOIN votes v2 on v2.character_id = c2.id LEFT JOIN votes v on v.match_up_id = m.id WHERE (character1_id = ? AND character2_id = ?) OR (character1_id = ? AND character2_id = ?) GROUP BY tip_content ORDER BY vote_count DESC', [req.body.base_char_id, req.body.matchup_char_id, req.body.matchup_char_id, req.body.base_char_id], function(err, rows) {
			if(err) {
				console.log("There was an error: " + err);
				res.redirect('/characters/' + req.body.base_char_id);
			}
			else if(rows.length != 0){
				console.log("Data Returned: " + JSON.stringify(rows[0]));
				res.render('matchup', {matchup_data: rows, session: req.session});
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
						res.render('matchup', {matchup_data: rows, session: req.session});
					}
				});
			};
		});
	},
	newVote: function(req, res) {
		console.log("New vote requested:");
		console.log(JSON.stringify(req.body));
		connection.query('INSERT INTO votes(match_up_id, character_id, user_id, voter_ip_address) VALUES (?, ?, ?, ?)', [req.body.matchup_id, req.body.character_id, req.session.user.id, req.session.user.ip], function(err) {
			if(err){
				console.log("There was an error: " + err);
				res.send("There was an error: " + err);
			}
			else{
				console.log("Vote created successfully.");
				res.redirect('/matchups/' + req.body.matchup_id);
			}
		});
	}
};