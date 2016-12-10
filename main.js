'use strict';

const ftData = require('./data/ft');
const organization = require('./types/organization');
const articleTransform = require('./types/article');
const personTransform = require('./types/person');

function ft () {
	return organization(ftData);
}

function article (content) {
	return articleTransform(content);
}

function person (content) {
	return personTransform(content)
}

module.exports = {
	ft: ft,
	newsArticle: article,
	person: person
};

