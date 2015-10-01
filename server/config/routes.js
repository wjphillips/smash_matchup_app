console.log("Routes have loaded succesfully")

module.exports = function(app) {
	app.get('/', function(req, res){
		res.render("index");
	});
};