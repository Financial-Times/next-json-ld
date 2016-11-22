'use strict';

const ftData = require('./data/ft');
const organization = require('./types/organization');
const newsArticle = require('./types/article');


function addContext (schema) {
	return Object.assign(schema, { "@context": "http://schema.org" });
}

function ft () {
	return new Promise (resolve => {
		resolve(JSON.stringify(addContent(organization(ftData))));
	});
}

function article (content) {
	return new Promise(resolve => {
		resolve(JSON.stringify(addContext(newsArticle(content))))
	});	
}

module.exports = {
	ft: ft,
	newsArticle: article
};
