console.log("Routes have loaded succesfully");
var characters_controller = require('../controllers/characters.js');

module.exports = function(app) {
	app.get('/', function(req, res) {
		res.render("index");
	}),
	app.get('/characters', function(req, res) {
		characters_controller.return_all_characters(req, res);
	}),
	app.get('/characters/:id', function(req, res) {
		characters.show(req, res);
	})
};