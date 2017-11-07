var passport = require('passport');
var Local = require('passport-local').Strategy;
var mongoose = require('mongoose');
var Users = mongoose.model('Users');

passport.serializeUser(function(user, done){
	done(null, user._id);
});

passport.deserializeUser(function(id, done){
	Users.findById(id).exec(function(err, user){
		if(err){
			throw(err);
		}
		done(null, user);
	});
});

passport.use(new Local({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	},
	function(req, username, password, done){
		console.log('auth started');
		Users.findOne({email: username}).exec(function(err, user){
			if(err){
				console.log(err);
				return done(err, false, req.flash('info', 'Auth error'));
			}
			if(!user){
				console.log('user not found');
				return done(null, false, req.flash('info', 'Incorrect username.'));
			}
			if(!user.validPassword(password)){
				console.log('incorrect password');
				return done(null, false, req.flash('info', 'Incorrect password.'));
			}
			console.log('Auth success');
			return done(null, user);
		});
	}
));