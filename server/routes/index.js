var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  	res.render('index', { title: 'Home', user: req.user || null });
});

router.get('/articles', function(req, res, next){
	res.render('articles', {title: 'Articles', user: req.user || null})
});

router.get('/register', function(req, res, next){
	res.render('register', { title: 'Register' });
});
/*router.get('/login', function(req, res, next){
	res.render('login', {title: 'Login', "errMessage": req.flash('info')});
});*/

router.get('/logout', function(req, res, next){
	req.logout();
	res.redirect('/');
});
router.get('/profile', function(req, res, next){
	res.render('./profile.jade', {title: "Profile", "user": req.user || {}, "payload": req.payload || {}});
});

module.exports = router;
