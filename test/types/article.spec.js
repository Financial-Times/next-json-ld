const { expect } = require('chai');
const proxyquire = require('proxyquire').noCallThru();

describe('Type: Article', function () {
	const mockCompany = { prefLabel: 'ft', entitlements: { free: 'freeEntitlement', premium: 'premiumEntitlement' } };
	let article;

	beforeEach(function () {
		article = proxyquire('../../types/article', {
			'../data/ft': mockCompany
		});
	});

	context('Subscribe with Google', function () {

		it('has correct base format', function () {
			const result = article({});
			expect(result.isAccessibleForFree).to.equal('False');
			expect(result.isPartOf).to.deep.equal({ '@type': [ 'CreativeWork', 'Product' ], name: 'ft' });
			expect(result.publisher).to.deep.equal({ '@type': 'Organization', '@context': 'http://schema.org', name: 'ft' });
		});

		it('sets isAccessibleForFree based upon content.accessLevel', function () {
			const result = article({ accessLevel: 'free' });
			expect(result.isAccessibleForFree).to.equal('True');
		});

		context('sets isPartOf.productID based upon content.accessLevel', function () {

			it('free content', function () {
				const result = article({ accessLevel: 'free' });
				expect(result.isAccessibleForFree).to.equal('True');
				expect(result.isPartOf.productID).to.equal('freeEntitlement');
			});

			it('paywalled content', function () {
				const result = article({ accessLevel: 'premium' });
				expect(result.isAccessibleForFree).to.equal('False');
				expect(result.isPartOf.productID).to.equal('premiumEntitlement');
			});

		});

	});

});
