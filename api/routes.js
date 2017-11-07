var express = require('express');
var passport = require('passport');
var router = express.Router();
var articlesCtrl = require('./controllers/articles.js');
var authCtrl = require('./controllers/auth.js');

router.get('/test', function(req, res, next){
	res.end(JSON.stringify({message: 'test'}));
});

router.get('/articles', articlesCtrl.get);
router.get('/articles/last/:limit', articlesCtrl.getLast);
router.get('/articles/:id', articlesCtrl.getOne);
router.post('/articles', articlesCtrl.insert);
router.put('/articles/:id', articlesCtrl.update);
router.delete('/articles/delete/:id', articlesCtrl.delete);

router.post('/login', passport.authenticate('local', {
	failureRedirect: '/login', 
	successRedirect:'back', 
	failureFlash: true
}));
//router.post('/login', authCtrl.login);
router.post('/register', authCtrl.register);

router.get('/logout', function(req, res, next){
	req.logout();
	res.redirect('/');
});


module.exports = router;