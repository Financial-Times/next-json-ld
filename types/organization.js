'use strict';

const image = require('./image');

module.exports = (company) => {
	const base = {
		"@type": "Organization",
		"name": company.prefLabel,
	};
	
	if (company.legalName) {
		Object.assign(base, { legalName: company.legalName });
	}

	if (company.logo) {
		Object.assign(base, { logo: image(company.logo) });
	}

	if (company.url) {
		Object.assign(base, { url: company.url });
	}

	return base;
}
