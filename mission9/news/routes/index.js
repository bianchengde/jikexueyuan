var express = require('express');
var router = express.Router();
var crypto = require('crypto'),
	News = require('../models/news.js');


/* GET home page. */
module.exports = function(app) {
	app.get('/', function(req, res) {
		News.getAllByType(1, function(err, result) {
			if (err) {
				req.flash('error', err);
				return res.redirect('index');
			}
			res.render('index', {
				titles: ["序号", "新闻题目", "新闻图片", "新闻内容","推荐","操作"],
				newsType:1,
				result: result,
				success: req.flash('success').toString(),
				error: req.flash('error').toString()
			});
		});
	});
	app.get('/news', function(req, res) {
		News.getAllByType(1, function(err, result) {
			if (err) {
				req.flash('error', err);
				return res.redirect('news');
			}
			res.render('news', {
				result: result,
				success: req.flash('success').toString(),
				error: req.flash('error').toString()
			});
		});
	});
	//获取指定类型的新闻（前台）
	app.get('/news/:type', function(req, res) {
		var type = parseInt(req.params.type);
		News.getAllByType(type, function(err, result) {
			if (err) {
				req.flash('error', err);
				return res.redirect('news');
			}
			res.render('news', {
				result: result,
				success: req.flash('success').toString(),
				error: req.flash('error').toString()
			});
		});
	});
	//获取指定类型新闻（后台）
	app.get('/:type', function(req, res) {
		var type = parseInt(req.params.type);
		News.getAllByType(type, function(err, result) {
			var newsType=null;
			if (err) {
				req.flash('error', err);
				return res.redirect('index');
			}
			res.render('index', {
				titles: ["序号", "新闻题目", "新闻图片", "新闻内容","推荐","操作"],
				newsType:type,
				result: result,
				success: req.flash('success').toString(),
				error: req.flash('error').toString()
			});
		});
	});
	//更新新闻
	app.post('/update', function(req, res) {
		var news = {};
		var result = {};
		news.newsTitle = req.body.newsTitle;
		news.newsContent = req.body.newsContent;
		news.id = req.body.id;
		news.newsType = req.body.newsType;
		var recommend=parseInt(req.body.recommend);
		console.log(recommend);
		if(recommend==1)
		{
			news.recommend=recommend;
		}
		else
		{
			news.recommend=0;
		}
		News.updateNews(news, function(err, data) {
			if (err) {
				req.flash('error', err);
				return res.redirect('index');
			}
			return res.redirect('/'+news.newsType);
		});
	});
	app.post('/remove', function(req, res) {
		var id = parseInt(req.body.id);
		News.remove(id, function(err, result) {
			if (err) {
				req.flash('error', err);
			}
			return res.redirect('/');
		});
	});
	//添加新闻
	app.post('/add/:url', function(req, res) {
		var news = {};
		news.newsTitle = req.body.newsTitle;
		news.newsContent = req.body.newsContent;
		news.newsType = parseInt(req.body.newsType);
		var recommend=parseInt(req.body.recommend);
		if(recommend==1)
		{
			news.recommend=recommend;
		}
		else
		{
			news.recommend=0;
		}
		//添加图片路径
		var url = req.params.url;
		url = "/img/" + url;
		news.newsImg = url;
		console.log(news.newsImg);
		News.addNews(news, function(err, result) {
			if (err) {
				req.flash('error', err);
			}
			return res.redirect('/'+news.newsType);
		});
	});
	app.use(function(req, res) {
		res.render("404");
	});

};

function checkLogin(req, res, next) {
	if (!req.session.user) {
		req.flash('error', '未登录');
		res.redirect('/login');
	}
	next();
}

function checkNotLogin(req, res, next) {
	if (req.session.user) {
		req.flash('error', '已登录');
		res.redirect('back');
	}
	next();
}