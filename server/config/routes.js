var characters_controller = require('../controllers/characters.js');
var matchups_controller = require('../controllers/matchups.js');
var users_controller = require('../controllers/users.js');
var sessions_controller = require('../controllers/sessions.js');
var tips_controller = require('../controllers/tips.js');

module.exports = function(app) {
	app.get('/', function(req, res) {
		var errors = [];
		req.session.ip = req.ip;
		res.render("index", {errors: errors, session: req.session});
	});
	app.get('/register', function(req, res) {
		var errors = [];
		res.render("register", {errors: errors});
	});
	app.get('/login', function(req, res) {
		var errors = [];
		res.render("login", {errors: errors});
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
	app.post("/sessions", function(req, res) {
		sessions_controller.login(req, res);
	});
	app.post("/tips", function(req, res) {
		tips_controller.create(req, res);
	});
	app.post("/likes", function(req, res) {
		tips_controller.like(req, res);
	});
	app.get("/logout", function(req, res) {
		sessions_controller.logout(req, res);
	});
};