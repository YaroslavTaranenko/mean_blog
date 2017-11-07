var mongoose = require('mongoose');
var conf = require('../config/database.js');

mongoose.connect(conf.url);

mongoose.connection.on('connected', function(){
	console.log("Mongoose connected to " + conf.url);
});
mongoose.connection.on('error', function(err){
	console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function(){
	console.log('Mongoose disconnected.');
});

var gracefullShutdown = function(msg, callback){
	mongoose.connection.close(function(){
		console.log('Mongoose disconnected through ' + msg);
		callback();
	})
};

process.on('SIGINT', function(){
	gracefullShutdown('app termination', function(){
		process.exit(0);
	});
});
process.on('SIGTERM', function(){
	gracefullShutdown('Heroku app termination', function(){
		process.exit(0);
	});
});

require('./articles.js');
require('./users.js');