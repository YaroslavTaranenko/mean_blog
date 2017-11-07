var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var multilangSchema = new Schema({
	ru: String,
	en: String
});

var articleSchema = new Schema({
	title: {type: multilangSchema, require: true},
	mainImgUrl: String,
	author: String,
	created: {type: Date, default: Date.now},
	editedBy: [String],
	editedLast: {type: Date, default: Date.now},
	short: String,
	text: String,
	published: {type: Boolean, default: true},
	tags: [String],
	images: [String]
});

mongoose.model('Articles', articleSchema, 'articles');