var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');

var isLoged = function(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/');
	res.status(401);
	res.json({"message": "not authenticated."});
	//res.redirect('/login');
}

/* GET home page. */
router.get('/', isLoged, function(req, res, next) {	
	res.render('admin/index', { title: 'Admin panel', user: req.user });
});


module.exports = router;