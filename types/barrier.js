'use strict';

const article = require('./article');
const organization = require('./organization');
const product = require('./product');
const ftData = require('../data/ft');

const hasMinimumContentData = (data) => {
	const requiredKeys = [
		'title',
		'authors',
		'publishedDate',
		'mainImage',
		'accessLevel'
	];
	return requiredKeys.every((key) => data[key]);
};

module.exports = (content) => {
	/* if passed article content markup as article */
	if (content && hasMinimumContentData(content)) return article(content);

	let baseSchema = {
		'@context': 'http://schema.org',
		'@type': 'CreativeWork'
	};

	Object.assign(baseSchema, { isPartOf: product(ftData, content) });

	Object.assign(baseSchema, { publisher: organization(ftData) });

	return baseSchema;
};
