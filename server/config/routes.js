console.log("Routes have loaded succesfully");
var characters = require('./controllers/characters.js');

module.exports = function(app) {
	app.get('/', function(req, res){
		res.render("index");
	});
	app.get('/character_list', function(req, res) {
		characters.get_character_names();
	});
};