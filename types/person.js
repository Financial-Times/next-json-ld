'use strict';

const organization = require('./organization');
const ftData = require('../data/ft');

module.exports = (person) => {

	const baseSchema = {
		"@type": "Person",
		"name": person.prefLabel || person.name
	};

	if (person.description) {
		Object.assign(baseSchema, {description: person.description});
	}

	if (person._imageUrl) {
		Object.assign(baseSchema, {image: person._imageUrl});
	}
	else if (person.headshot) {
		Object.assign(baseSchema, {image: person.headshot});
	}

	if (person.url) {
		Object.assign(baseSchema, {url: person.url});
	}

	if (person.emailAddress) {
		Object.assign(baseSchema, {email: person.emailAddress});
	}

	if (person.strapline) {
		Object.assign(baseSchema, {jobTitle: person.strapline});
	}

	if (person.twitterHandle) {
		Object.assign(baseSchema, {sameAs: [`https://www.twitter.com/${person.twitterHandle}`]});
	}

	Object.assign(baseSchema, {worksFor: organization(ftData)})

	return baseSchema;
}

