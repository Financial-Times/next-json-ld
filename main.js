'use strict';

const ftData = require('./data/ft');
const organization = require('./types/organization');
const newsArticle = require('./types/article');

function addTag (schema) {
	return `<script type="application/ld+json">${JSON.stringify(schema)}</script>`;
}

function ft () {
	return new Promise (resolve => {
		resolve(addTag(organization(ftData)));
	});
}

function article (content) {
	return new Promise(resolve => {
		resolve(addTag(newsArticle(content)))
	});	
}

module.exports = {
	ft: ft,
	newsArticle: article
};
