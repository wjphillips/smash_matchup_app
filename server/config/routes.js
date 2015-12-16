var characters_controller = require('../controllers/characters.js');
var matchups_controller = require('../controllers/matchups.js');
var users_controller = require('../controllers/users.js');

module.exports = function(app) {
	app.get('/', function(req, res) {
		res.render("index");
	});
	app.get('/register', function(req, res) {
		res.render("register");
	});
	app.get('/characters', function(req, res) {
		characters_controller.return_all_characters(req, res);
	});
	app.get("/characters/:id", function(req, res) {
		characters_controller.show_base_character(req, res);
	});
	app.get("/matchups/:id", function(req, res) {
		matchups_controller.show_matchup_by_id(req, res);
	});
	app.get("/new_matchup/:id1/:id2", function(req, res) {
		matchups_controller.create(req, res);
	});
	app.post("/matchups", function(req, res) {
		console.log("Matchup between " + req.body.base_char_name + " and " + req.body.matchup_char_name + " requested.");
		matchups_controller.show_matchup_by_chars(req, res);
	});
	app.post("/users", function(req, res) {
		users_controller.create(req, res);
	});
};