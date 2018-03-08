const { expect } = require('chai');
const proxyquire = require('proxyquire').noCallThru();

describe('Type: Barrier', function () {
	const mockCompany = { prefLabel: 'ft', entitlements: { premium: 'premiumEntitlement' } };
	let barrier;

	beforeEach(function () {
		barrier = proxyquire('../../types/barrier', {
			'../data/ft': mockCompany
		});
	});

	context('standalone barrier (aka product selector)', function () {

		it('has correct base format', function () {
			const result = barrier();
			expect(result.isAccessibleForFree).to.be.undefined;
			expect(result['@type']).to.equal('CreativeWork');
			expect(result.isPartOf).to.deep.equal({ '@type': [ 'CreativeWork', 'Product' ], name: 'ft' });
			expect(result.publisher).to.deep.equal({ '@type': 'Organization', '@context': 'http://schema.org', name: 'ft' });
		});

	});

	context('content paywall', function () {

		it('has correct base format with data pertaining to requested content', function () {
			const result = barrier({ accessLevel: 'foo' });
			expect(result.isAccessibleForFree).to.equal('False');
			expect(result.isPartOf).to.deep.equal({ '@type': [ 'CreativeWork', 'Product' ], name: 'ft' });
			expect(result.publisher).to.deep.equal({ '@type': 'Organization', '@context': 'http://schema.org', name: 'ft' });
		});

		it('wont add productID entitlements label if no matching content.accessLevel', function () {
			const result = barrier({ accessLevel: 'foo' });
			expect(result.isPartOf).to.deep.equal({ '@type': [ 'CreativeWork', 'Product' ], name: 'ft' });
		});

		it('correctly formats productId entitlements label based upon content.accessLevel', function () {
			const mockContent = { accessLevel: 'premium' };
			const result = barrier(mockContent);
			expect(result.isPartOf.productID).to.equal('premiumEntitlement');
		});

	});

});
