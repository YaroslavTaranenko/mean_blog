var mongoose = require('mongoose');
var Articles = mongoose.model('Articles');

var sendRes = function(res, status, content){
	res.status(status);
	res.json(content);
};

module.exports.get = function(req, res, next){
	Articles.find().sort('-created').exec(function(err, articles){
		if(err){
			sendRes(res, 500, err);
		}else{
			sendRes(res, 200, articles);
		}
	});
};

module.exports.getLast = function(req, res, next){
	Articles.find().limit(req.params.limit || 0).sort('-created').exec(function(err, articles){
		if(err){
			sendRes(res, 500, err);
		}else{
			sendRes(res, 200, articles);
		}
	});
};

module.exports.getOne = function(req, res, next){
	Articles.findById(req.params.id).exec(function(err, articles){
		if(err){
			sendRes(res, 500, err);
		}else{
			sendRes(res, 200, articles);
		}
	});
};

module.exports.insert = function(req, res, next){
	var article = new Articles(req.body.item);
	article.save(function(err, insertedItem){
		if(err){
			sendRes(res, 500, err);
		}else{
			sendRes(res, 200, insertedItem);
		}
	});
};
module.exports.update = function(req, res, next){
	Articles.findById(req.params.id).exec(function(err, article){
		if(err){
			sendRes(res, 500, err);
		}else{
			if(article){
				article.title = req.body.item.title;
				article.mainImgUrl = req.body.item.mainImgUrl;
				if(!article.editedBy){
					article.editedBy = [];
				}
				article.editedBy.push(req.body.item.editedBy);
				article.edited = new Date();
				article.short = req.body.item.short;
				article.text = req.body.item.text;
				article.published = req.body.item.published;
				article.save(function(error, updated){
					if(error){
						sendRes(res, 500, error);
					}else{
						sendRes(res, 200, updated);
					}
				});
			}else{
				sendRes(res, 404, 'Article not found.');
			}
		}
	});
};
module.exports.delete = function(req, res, next){
	Articles.findByIdAndRemove(req.params.id).exec(function(err, articles){
		if(err){
			sendRes(res, 500, err);
		}else{
			sendRes(res, 200, articles);
		}
	});
};