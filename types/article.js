'use strict';

const htmlToText = require('html-to-text');
const wordcount = require('wordcount');
const image = require('./image');
const person = require('./person');
const organization = require('./organization');
const product = require('./product');
const ftData = require('../data/ft');

function getArticleBody (content) {
	if (content.bodyText) {
		return content.bodyText;
	}

	if (content.bodyHTML) {
		return htmlToText.fromString(content.bodyHTML, {ignoreHref: true});
	}

	return '';
}

module.exports = (content) => {
	let baseSchema = {
		'@context': 'http://schema.org',
		'@type': 'NewsArticle',
		'url': content.canonicalUrl,
		'headline': content.title,
		'datePublished': content.initialPublishedDate ? content.initialPublishedDate : content.publishedDate,
		'dateModified': content.publishedDate,
		'description': content.description,
		'isAccessibleForFree': content.accessLevel && content.accessLevel === 'free' ? 'True' : 'False'
	};

	Object.assign(baseSchema, { isPartOf: product(ftData, content) });

	if (content.alternativeTitles && content.alternativeTitles.promotionalTitle) {
		Object.assign(baseSchema, { alternativeHeadline: content.alternativeTitles.promotionalTitle });
	}

	if (content.mainImage) {
		Object.assign(baseSchema, { image: image(content.mainImage) });
	}

	if (content.authors) {
		content.authors.forEach(author => {
			Object.assign(baseSchema, { 'author': person(author) });
		});
	}

	const articleBody = getArticleBody(content);
	if (articleBody) {
		Object.assign(baseSchema, { articleBody, wordCount: wordcount(articleBody) });
	}

	Object.assign(baseSchema, { publisher: organization(ftData) });

	return baseSchema;
};
