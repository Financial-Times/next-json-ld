const { expect } = require('chai');

const product = require('../../types/product');

describe('Type: Product', function () {
	const mockEntitlements = {
		free: 'freeEntitlement',
		premium: 'premiumEntitlement'
	};
	const mockCompany = { prefLabel: 'ft', entitlements: mockEntitlements };

	it('has correct base format', function () {
		const result = product(mockCompany, {});
		expect(result).to.deep.equal({
			'@type': ['CreativeWork', 'Product'],
			name: 'ft'
		});
	});

	it('wont add productID entitlements label if no matching content.accessLevel', function () {
		const result = product(mockCompany, { accessLevel: 'foo' });
		expect(result).to.deep.equal({
			'@type': ['CreativeWork', 'Product'],
			name: 'ft'
		});
	});

	it('correctly formats productId entitlements label based upon content.accessLevel', function () {
		const mockContent = { accessLevel: 'free' };
		const result = product(mockCompany, mockContent);
		expect(result.productID).to.equal('freeEntitlement');
	});
});
