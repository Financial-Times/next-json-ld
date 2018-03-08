'use strict';

const article = require('./article');
const organization = require('./organization');
const product = require('./product');
const ftData = require('../data/ft');

module.exports = (content) => {
	/* if passed article content markup as if article */
	if (content) return article(content);

	let baseSchema = {
		'@context': 'http://schema.org',
		'@type': 'CreativeWork'
	};

	Object.assign(baseSchema, { isPartOf: product(ftData, content) });

	Object.assign(baseSchema, { publisher: organization(ftData) });

	return baseSchema;
};
