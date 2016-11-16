'use strict';

module.exports = (image) => {
	return {
		"@type": "ImageObject",
		"url": image.url,
		"width": image.width,
		"height": image.height
	};
}
