const image = require('./image');
const organization = require('./organization');
const ftData = require('../data/ft');

// https://en.wikipedia.org/wiki/ISO_8601#Durations
const duration = (ms) => {
	const date = new Date(ms);
	return `PT${date.getMinutes()}M${date.getSeconds()}S`;
};

const encodings = {
	'video/mp4': 'mpeg4'
};

/**
 * @param {Object} [rendition={}]
 * @param {number} rendition.width
 * @param {number} rendition.height
 * @param {number} rendition.duration
 */
module.exports = (content, rendition = {}) => ({
	'@context': 'http://schema.org',
	'@type': 'VideoObject',
	// Thing
	url: content.url,
	name: content.title,
	description: content.standfirst,
	// CreativeWork
	datePublished: content.publishedDate,
	author: organization(ftData),
	publisher: organization(ftData),
	thumbnailUrl: content.mainImage && content.mainImage.url,
	// MediaObject
	width: rendition.width,
	height: rendition.height,
	playerType: 'HTML5',
	duration: duration(rendition.duration),
	uploadDate: content.publishedDate,
	contentUrl: rendition.url,
	encodingFormat: encodings[rendition.mediaType],
	requiresSubscription: false,
	// VideoObject
	thumbnail: content.mainImage && image(content.mainImage)
});
