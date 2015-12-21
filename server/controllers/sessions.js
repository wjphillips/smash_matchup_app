var fs = require('fs');
var mysql = require('mysql');
var validator = require('validator');
var User = require('../models/user');
var bcrypt = require('bcrypt-nodejs');
var session = require('express-session');
var connection = mysql.createConnection({
	host: 'localhost', 
	user: 'root',
	password: 'root',
	database: 'smash_app'
});

module.exports = {
	login: function(req, res) {
		var errors = [];
		console.log("Login requested: " + req.body.email);
		//Check for valid email address
		if(validator.isEmail(req.body.email) == false){
			errors.push("Please enter a valid e-mail address");
			res.render('login', {errors: errors});
		}
		connection.query('SELECT * FROM users WHERE email LIKE ?', [req.body.email], function(err, row) {
			//Check for errors in query
			if(err){
				console.log("Something went wrong." + err);
				errors.push(err);
				res.render('login', {errors: errors});
			}
			//Check if nothing was returned
			else if(row[0] == undefined){
				console.log("E-mail address not found in database.");
				errors.push("There is no account associated with the e-mail address requested. Please register.");
				res.render('login', {errors: errors});
			}
			else{
				console.log('Database returned: ' + row[0]);
				//Check if password matches decrypted hash
				var result = bcrypt.compareSync(req.body.password, row[0].hash);
				if(result){
					console.log('Login success!');
					var sess = req.session;
					sess.login = true;
					sess.user = row[0];
					res.redirect('/');
				}
				else{
					console.log("Incorrect password.");
					errors.push("Invalid e-mail address/password combination.");
					res.render('login', {errors: errors});
				}
			}
		});
	},
	logout: function(req, res) {
		req.session.destroy(function(err) {});
		res.redirect('/');
	}
}