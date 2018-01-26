'use strict';

const organization = require('./organization');
const ftData = require('../data/ft');

module.exports = (content) => {
	let baseSchema = {
		'@context': 'http://schema.org',
		// '@type': 'NewsArticle', TBC
		// 'url': content.canonicalUrl, TBC
		// 'headline': content.title, TBC ?
		// 'datePublished': content.initialPublishedDate ? content.initialPublishedDate : content.publishedDate,
		// 'dateModified': content.publishedDate,
		// 'description': content.description,

		// for swg
		'isAccessibleForFree': content.freeArticle ? 'True' : 'False',
		'accessLevelLabel': content.accessLevel,
		// 'publicationId': '' TBC ? is this needed? - can it go on an org level
	};

	Object.assign(baseSchema, { publisher: organization(ftData) });

	return baseSchema;
};
