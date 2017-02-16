'use strict';

module.exports = (image) => {
	return {
		'@type': 'ImageObject',
		'@context':'http://schema.org',
		'url': image.url,
		'width': image.width,
		'height': image.height
	};
}
