var fs = require('fs');
var mysql = require('mysql');
var connection = mysql.createConnection({
	host: 'localhost', 
	user: 'root',
	password: 'root',
	database: 'smash_app'
});

module.exports = {
	addNew: function(req, res, tipData){
		connection.query('INSERT INTO tips (content, created_at, updated_at, user_id, character_id, match_up_id) VALUES (?, NOW(), NOW(), ?, ?, ?)', [tipData.content, tipData.user_id, tipData.character_id, tipData.matchup_id], function(err) {
			if(err){
				console.log("There was an error: " + err);
			}
			else{
				console.log("Tip created successfully.");
				res.redirect('/matchups/' + tipData.matchup_id);
			}
		});
	}
}