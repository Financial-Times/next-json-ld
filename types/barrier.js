'use strict';

const organization = require('./organization');
const product = require('./product');
const ftData = require('../data/ft');


module.exports = (content) => {
	let baseSchema = {
		'@context': 'http://schema.org',
		'isAccessibleForFree': 'False'
	};

	Object.assign(baseSchema, { isPartOf: product(ftData, content) });

	Object.assign(baseSchema, { publisher: organization(ftData) });

	return baseSchema;
};
