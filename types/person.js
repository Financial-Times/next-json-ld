'use strict';

const organization = require('./organization');
const social = require('./social');
const ftData = require('../data/ft');

module.exports = (person) => {
	const sameAs = social(person, 'person');
	const baseSchema = {
		'@type': 'Person',
		'@context': 'http://schema.org',
		name: person.prefLabel || person.name
	};

	if (person.description) {
		Object.assign(baseSchema, { description: person.description });
	}

	if (person._imageUrl) {
		Object.assign(baseSchema, { image: person._imageUrl });
	} else if (person.headshot) {
		Object.assign(baseSchema, { image: person.headshot });
	}

	if (person.url) {
		Object.assign(baseSchema, { url: person.url });
	}

	if (person.emailAddress) {
		Object.assign(baseSchema, { email: person.emailAddress });
	}

	if (person.strapline) {
		Object.assign(baseSchema, { jobTitle: person.strapline });
	}

	if (sameAs.length) {
		Object.assign(baseSchema, { sameAs: sameAs });
	}

	Object.assign(baseSchema, { worksFor: organization(ftData) });

	return baseSchema;
};
