'use strict';

const image = require('./image');
const social = require('./social');

module.exports = (company) => {
	const sameAs = social(company, 'organization');
	const base = {
		"@type": "Organization",
		"@context":"http://schema.org",
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
	
	if (sameAs.length) {
		Object.assign(base, {sameAs: sameAs});
	}

	return base;
}
