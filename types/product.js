module.exports = (company = {}, content = {}) => {
	const baseSchema = {
		'@type': ['CreativeWork', 'Product'],
		name: company.prefLabel
	};

	const entitlementsLabel = (company.entitlements || {})[content.accessLevel];

	if (entitlementsLabel) {
		Object.assign(baseSchema, { productID: entitlementsLabel });
	}

	return baseSchema;
};
