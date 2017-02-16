const image = require('./image');
const organization = require('./organization');
const ftData = require('../data/ft');

// https://en.wikipedia.org/wiki/ISO_8601#Durations
const duration = (ms) => {
	const date = new Date(ms);
	return `PT${date.getMinutes()}M${date.getSeconds()}S`;
};

module.exports = (content) => {
	const rendition = content.attachments.find((item) => (
		// We have several renditions with more on the way... 480x270, 640x360 and 960x540
		item.mediaType === 'video/mp4' && item.width >= 640 && item.width < 960
	));

	let baseSchema = {
		"@context": "http://schema.org",
		"@type": "VideoObject",
		// Thing
		"url": content.url,
		"name": content.title,
		"description": content.standfirst,
		// CreativeWork
		"datePublished": content.publishedDate,
		"author": organization(ftData),
		"publisher": organization(ftData),
		// MediaObject
		"width": rendition.width,
		"height": rendition.height,
		"playerType": "HTML5",
		"duration": duration(rendition.duration),
		// VideoObject
		"thumbnail": image(content.mainImage)
	};

	return baseSchema;
}
