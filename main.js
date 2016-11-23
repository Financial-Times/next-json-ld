'use strict';

const ftData = require('./data/ft');
const organization = require('./types/organization');
const newsArticle = require('./types/article');

function ft () {
	return organization(ftData);
}

function article (content) {
	return newsArticle(content);
}

module.exports = {
	ft: ft,
	newsArticle: article
};
