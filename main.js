'use strict';

const article = require('./types/article');

function init (options) {
	const baseSchema = {
		"@context": "http://schema.org"
	};
	
	if (!options.content) {
		return;
	}

	if (options.type === 'article') {
		return JSON.stringify(Object.assign(baseSchema, article(options.content)));
	}
}

module.exports = init;
