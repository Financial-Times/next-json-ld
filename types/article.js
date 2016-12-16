'use strict';

const htmlToText = require('html-to-text');
const wordcount = require('wordcount');
const image = require('./image');
const person = require('./person');
const organization = require('./organization');
const ftData = require('../data/ft');

module.exports = (content) => {
	let baseSchema = {
		"@context": "http://schema.org",
		"@type": "NewsArticle",
		"url": content.canonicalUrl,
		"headline": content.title,
		"datePublished": content.initialPublishedDate ? content.initialPublishedDate : content.publishedDate,
		"dateModified": content.publishedDate,
		"description": content.description
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

	if (content.bodyHTML) {
		const text = htmlToText.fromString(content.bodyHTML, {ignoreHref: true});
		Object.assign(baseSchema, {articleBody: text, wordCount: wordcount(text)})
	}

	Object.assign(baseSchema, { publisher: organization(ftData) });

	return baseSchema;
}
