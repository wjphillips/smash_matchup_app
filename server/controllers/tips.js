var fs = require('fs');
var mysql = require('mysql');
var Tip = require('../models/tip');
var connection = mysql.createConnection({
	host: 'localhost', 
	user: 'root',
	password: 'root',
	database: 'smash_app'
});

module.exports = {
	create: function(req, res){
		console.log("New tip submission requested: ");
		var tipData = {};
		tipData.content = req.body.content;
		tipData.character_id = req.body.character_id;
		tipData.matchup_id = req.body.matchup_id;
		tipData.user_id = req.session.user.id;
		Tip.addNew(req, res, tipData);
	}, 
	like: function(req, res){
		console.log("New like requested.");
		console.log(JSON.stringify(req.body));
		connection.query('INSERT INTO likes (user_id, tip_id) VALUES (?, ?)', [req.body.user_id, req.body.tip_id], function(err) {
			if(err){
				res.send("There was an error creating the like.");
			}
			else{
				console.log("Like created successfully.");
			}
		});
		connection.query('UPDATE tips SET vote_count = vote_count + 1 WHERE id = ?', [req.body.tip_id], function(err) {
			if(err){
				res.send("There was an error updating the tip vote count.");
			}
			else{
				console.log("Vote count updated successfully.");
				res.redirect('/matchups/' + req.body.matchup_id);
			}
		});
	}
}