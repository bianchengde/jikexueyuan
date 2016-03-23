var mongodb = require('./db');
var markdown = require('markdown').markdown;

function News(id, newsTitle, newsImg, newsContent, newsType, recommend) {
	this.id = id;
	this.newsTitle = newsTitle;
	this.newsImg = newsImg;
	this.newsContent = newsContent;
	this.newsType = newsType;
	this.recommend = recommend;
}

module.exports = News;

News.prototype.save = function(callback) {

	var date = new Date();
	//存储各种时间格式，方便以后扩展
	var time = {
		date: date,
		year: date.getFullYear(),
		month: date.getFullYear() + "-" + (date.getMonth() + 1),
		day: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
		minute: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +
			date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
	};

	var news = {
		id: this.id,
		newsTitle: this.newsTitle,
		newsImg: this.newsImg,
		newsContent: this.newsContent,
		newsType: this.newsType,
		recommend: this.recommend
	};

	//open db
	mongodb.open(function(err, db) {
		if (err) {
			return callback(err);
		}

		db.collection('news', function(err, collection) {
			if (err) {
				return callback(err);
			}

			// check if post exists
			collection.findOne({
				newsTitle: news.newsTitle
			}, function(err, post) {
				if (news) {
					mongodb.close();
					return callback(err);
				}
			});

			collection.insert(post, {
				safe: true
			}, function(err, result) {
				mongodb.close();
				if (err) {
					return callback(err);
				}
				callback(null, result["ops"][0]);
			});
		});
	});
};
// 根据新闻类型查询所有新闻
News.getAllByType = function(newsType, callback) {

	// open db
	mongodb.open(function(err, db) {
		if (err) {
			return callback(err);
		}

		db.collection('news', function(err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			var query = {};
			if (newsType) {
				query.newsType = newsType;
			};
			//使用 count 返回特定查询的文档数 total
			collection.find(query).toArray(function(err, docs) {
				if (err) {
					return callback(err);
				}
				return callback(null, docs);
			});
		});
	});
};
//添加新闻
News.addNews = function(news, callback) {
	mongodb.open(function(err, db) {
		if (err) {
			return callback(err);
		}
		db.collection('news', function(err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			var newsid = 0;
			collection.find().sort({
				"id": -1
			}).limit(1).toArray(
				function(err, docs) {
					newsid = docs[0].id;
					if (newsid) {
						news.id = newsid + 1;
					} else {
						news.id = 0;
					}
					collection.insert({
						id: news.id,
						newsTitle: news.newsTitle,
						newsContent: news.newsContent,
						newsImg: news.newsImg,
						newsType:news.newsType,
						recommend:news.recommend
					});
				}
			);
			return callback(null);
		});
	});
}

//更新新闻
News.updateNews = function(news, callback) {
	mongodb.open(function(err, db) {
		if (err) {
			return callback(err);
		}
		db.collection('news', function(err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			collection.update({
				"id": parseInt(news.id)
			}, {
				$set: {
					'newsTitle': news.newsTitle,
					'newsContent': news.newsContent,
					'newsType': parseInt(news.newsType),
					'recommend':news.recommend
				}
			});
			return callback(null);
		});
	});
};

//删除新闻
News.remove = function(id, callback) {
		//open db
		mongodb.open(function(err, db) {
			if (err) {
				return callback(err);
			}
			db.collection('news', function(err, collection) {
				if (err) {
					mongodb.close();
					return callback(err);
				}
				collection.deleteOne({
					id: id
				}, function(err) {
					mongodb.close();
					if (err) {
						return callback(err);
					}
					callback(null);
				});
			});

		});
	}
	// 根据用户名,标题,时间获取文章
	/*News.getOne = function (newsTitle, day, title, callback){ 

	    //open db
	    mongodb.open(function (err, db) {
	        if(err){
	            return callback(err);
	        }

	        db.collection('news', function (err, collection) {
	            if (err){

	                mongodb.close();
	                return  callback(err);
	            }
	            collection.findOne({
	                "name": name,
	                "title": title,
	                "time.day": day
	            }, function (err, result) {
	                if (err) {
	                    mongodb.close();
	                    return callback(err);
	                }
	                if (result){
	                    collection.update({
	                        name: name,
	                        "time.day": day,
	                        title: title
	                    },{
	                        $inc: {pv: 1}
	                    }, function (err) {
	                        mongodb.close();
	                        if (err){
	                            return callback(err);
	                        }
	                    });
	                }

	                if (result) {
	                  result.post = markdown.toHTML(result.post);
	                  result.comments.forEach(function (comment) {
	                    comment.content = markdown.toHTML(comment.content);
	                  });
	                }
	                callback(null, result);
	            });
	        });
	    });
	};*/

/*News.edit = function (name, day, title, callback) { 
  // open db
    mongodb.open(function (err, db) {
        if (err){
            return callback(err);
        }

        db.collection('posts', function (err, collection) {
           if (err){
               mongodb.close();
               return callback(err);
           }

            collection.findOne({
                name: name,
                "time.day": day,
                title: title
            }, function (err, results) {
                mongodb.close();
                if(err){
                    return callback(err);
                }

                callback(null, results);
            });
        });
    });
};*/

/*News.update = function (newsTitle, newsImg, newsContent, newsType) {

    mongodb.open(function (err, db) {
       if (err){
           return callback(err);
       }

        db.collection('news', function (err, collecton) {
           if (err){
               mongodb.close();
               return callback(err);
           }

            collecton.updateOne({
                newsTitle: newsTitle,
                newsImg: newsImg,
                newsContent: newsContent,
                newsType:newsType
            }, {
                $set: {news: news}
            }, function (err) {
                mongodb.close();
                if (err){
                    return callback(err);
                }

                callback(null);
            });
        });
    });
};

News.remove = function (id,newsTitle, newsImg, newsContent, newsType) {
    mongodb.open(function (err, db) {
        if (err){
            return callback(err);
        }

        db.collection('posts', function (err, collection) {
            if (err){
                mongodb.close();
                return callback(err);
            }

            collection.deleteOne({
               id:id
            }, function (err) {
                mongodb.close();
                if(err){
                    return callback(err);
                }

                callback(null);
            });
        });
    });
};*/

/*Post.archive = function (callback) {

    mongodb.open(function (err, db) {
        if (err){
            return callback(err);
        }

        db.collection('posts', function (err, collection) {
           if (err){
               mongodb.close();
               return callback(err);
           }

            //返回只包含 name、time、title 属性的文档组成的存档数组
            collection.find({},{
                name: 1,
                time: 1,
                title: 1
            },{
                sort: {time: -1}
            }).toArray(function (err, docs) {
                mongodb.close();
                if (err){
                    return callback(err);
                }

                return callback(null, docs);
            });
        });
    });
};
*/
//返回所有标签
/*Post.getTags = function(callback) {
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        db.collection('posts', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            //distinct 用来找出给定键的所有不同值
            collection.distinct("tags", function (err, docs) {
                mongodb.close();
                if (err) {
                    return callback(err);
                }
                callback(null, docs);
            });
        });
    });
};*/

//返回含有特定标签的所有文章
/*Post.getTag = function(tag, callback) {
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }
        db.collection('posts', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            //查询所有 tags 数组内包含 tag 的文档
            //并返回只含有 name、time、title 组成的数组
            collection.find({
                "tags": tag
            }, {
                "name": 1,
                "time": 1,
                "title": 1
            }).sort({
                time: -1
            }).toArray(function (err, docs) {
                mongodb.close();
                if (err) {
                    return callback(err);
                }
                callback(null, docs);
            });
        });
    });
};*/

// search
/*Post.search = function (keyword, callback) {
    mongodb.open(function (err, db) {

        if (err){
            return callback(err);
        }

        db.collection('posts', function (err, collection) {
            if (err){
                mongodb.close();
                return callback(err);
            }

            var pattern = new RegExp(keyword, "i");
            collection.find({
                title: pattern
            },{
                name: 1,
                time: 1,
                title: 1
            }).sort({
                time: -1
            }).toArray(function (err, docs) {
                mongodb.close();
                if (err){
                    return callback(err);
                }

                return callback(null, docs);
            });
        });
    });
};*/