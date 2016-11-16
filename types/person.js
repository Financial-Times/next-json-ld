'use strict';

module.exports = (person) => {
	
	const baseSchema = {
		"@type": "Person",
		"name": person.name
	};

	if (person.headshot) {
		Object.assign(baseSchema, {image: person.headshot});
	}

	if (person.url) {
		Object.assign(baseSchema, {url: person.url});
	}

	return baseSchema;
}
