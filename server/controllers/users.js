var fs = require('fs');
var mysql = require('mysql');
var validator = require('validator');
var User = require('../models/user');
var bcrypt = require('bcrypt-nodejs');
var connection = mysql.createConnection({
	host: 'localhost', 
	user: 'root',
	password: 'root',
	database: 'smash_app'
});

//HELPER FUNCTIONS
function capitalize(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
};

//CONTROLLER FUNCTIONS
module.exports = {
	create: function(req, res) {
		console.log("New User Requested: " + JSON.stringify(req.body, null, 4));
		var errors = [];
		//User info validation checks
		//EMAIL
		if(req.body.email == "" || null){
			errors.push("Email address is a required field.")
		};
		if(validator.isEmail(req.body.email) == false){
			errors.push("The e-mail address you entered is not a valid e-mail address.");
		};
		//ALIAS
		if(req.body.alias == "" || null){
			errors.push("Alias is a required field.");
		};
		if(req.body.alias.length < 5){
			errors.push("The alias you have chosen is too short, it must be 5-24 characters in length.");
		};
		if(req.body.alias.length > 24){
			errors.push("The alias you have chosen is too long, it must be 5-24 characters in length.");
		};
		//PASSWORD
		if(req.body.password != req.body.password_conf){
			errors.push("The passwords do not match.");
		};
		if(req.body.password.length < 7){
			errors.push("Your password is too short, it must be 7-18 characters in length.");
		};
		if(req.body.password.length > 18){
			errors.push("Your password is too long, it must be 7-18 characters in length.");
		};
		//End validation checks
		if(errors.length == 0){
			var userInfo = {};
			userInfo.first_name = capitalize(req.body.first_name);
			userInfo.last_name = capitalize(req.body.last_name);
			userInfo.email = req.body.email;
			userInfo.hash = bcrypt.hashSync(req.body.password);
			userInfo.alias = req.body.alias;
			User.addNew(req, res, userInfo);
		};
		res.render('register', {errors: errors});
	}
};