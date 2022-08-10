'use strict';

const organization = require('./organization');
const ftData = require('../data/ft');

module.exports = () => {
	const baseSchema = {
		'@type': 'WebPage',
		'@context': 'http://schema.org',
		copyrightHolder: organization(ftData),
		publisher: organization(ftData)
	};

	return baseSchema;
};
