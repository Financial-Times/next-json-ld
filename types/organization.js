'use strict';

module.exports = (company) => {
	return {
		"@type": "Organization",
		"name": company.name
	};
}
