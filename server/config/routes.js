var characters_controller = require('../controllers/characters.js');
var matchups_controller = require('../controllers/matchups.js');

module.exports = function(app) {
	app.get('/', function(req, res) {
		res.render("index");
	});
	app.get('/characters', function(req, res) {
		characters_controller.return_all_characters(req, res);
	});
	app.get("/characters/:id", function(req, res) {
		characters_controller.show_base_character(req, res);
	});
	app.get('/matchups', function(req, res) {
		res.redirect('/');
	});
	app.get("/matchups/:id", function(req, res) {
		matchups_controller.show_matchup_by_id(req, res);
	});
	app.post("/matchups", function(req, res) {
		console.log("Matchup between " + req.body.base_char_name + " and " + req.body.matchup_char_name + " requested.");
		matchups_controller.show_matchup_by_chars(req, res);
	});
};