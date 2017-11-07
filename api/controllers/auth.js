var mongoose = require('mongoose');
var User = mongoose.model('Users');
var passport = require('passport');

var sendRes = function(res, status, content){
	res.status(status);
	res.json(content);
};

module.exports.register = function(req, res){
	var user = new User();
	user.email = req.body.email;
	user.displayName = req.body.name;
	user.firstName = req.body.firstName;
	user.lastName = req.body.lastName;
	user.avatar = req.body.avatar;
	user.setPassword(req.body.password);

	user.save(function(err, newUser){
		if(err){
			sendRes(res, 500, err);
		}else{
			var token = user.generateJwt();
			sendRes(res, 200, {"token": token});
		}
	});
};

module.exports.login = function(req, res, next){
	//console.log('auth started (auth.js)');
	//console.log('username:' + req.body.email);
	//console.log('password:' + req.body.password);
	passport.authenticate('local', function(err, user, info){

		var token;

		if(err){
			sendRes(res, 404, err);
			return;
		}
		if(user){
			token = user.generateJwt();
			req.logIn(user, function(err){
				if(err)return next(err);
			});
			sendRes(res, 200, {"token": token});
		}else{
			sendRes(res, 401, info);
		}
	})(req, res, next);
};