'use strict';

const schema = require('./main');
const articleData = require('./fixtures/article') 

schema.newsArticle(articleData).then((schema) => {
	console.log(schema)
});
