'use strict';

const image = require('./image');
const person = require('./person');
const publisher = require('./publisher');

module.exports = (content) => {
	let baseSchema = {
		"@type": "NewsArticle",
		"mainEntityofPage": content.canonicalUrl,
		"headline": content.title,
		"datePublished": content.initialPublishedDate ? content.initialPublishedDate : content.publishedDate,
		"dateModified": content.publishedDate,
		"description": content.initialPublishedDate ? content.description : content.title
	};

	if (content.alternativeTitles && content.alternativeTitles.promotionalTitle) {
 	  	Object.assign(baseSchema, { alternativeHeadline: content.alternativeTitles.promotionalTitle });
	}
	
	if (content.mainImage) {
		Object.assign(baseSchema, { image: image(content.mainImage) });
	}

	if (content.authors) {
		content.authors.forEach(author => {
			Object.assign(baseSchema, { "author": person(author) });
		});
	}

	Object.assign(baseSchema, publisher());

	return baseSchema;
}
