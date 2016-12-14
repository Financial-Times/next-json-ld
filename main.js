'use strict';

const ftData = require('./data/ft');
const organization = require('./types/organization');
const articleTransform = require('./types/article');
const personTransform = require('./types/person');
const webSiteTransform = require('./types/website');

function ft () {
	return organization(ftData);
}

function article (content) {
	return articleTransform(content);
}

function person (content) {
	return personTransform(content)
}

function webSite (content) {
	return webSiteTransform(content)
}

module.exports = {
	ft: ft,
	newsArticle: article,
	person: person,
	webSite: webSite
};

