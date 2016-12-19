'use strict';

const organization = require('./organization');
const ftData = require('../data/ft');

module.exports = (person) => {

	const baseSchema = {
		"@type": "WebPage",
		"@context":"http://schema.org",
		"copyrightHolder": organization(ftData),
		"publisher": organization(ftData)
	};

	return baseSchema;
}

