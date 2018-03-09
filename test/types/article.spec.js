const { expect } = require('chai');
const article = require('../../types/article');

describe('Type: Article', function () {

	context('Subscribe with Google', function () {

		it('has correct base format', function () {
			const result = article({});
			expect(result.isAccessibleForFree).to.equal('False');
			expect(result.isPartOf).to.deep.equal({ '@type': [ 'CreativeWork', 'Product' ], name: 'Financial Times' });
			expect(result.publisher).to.contain({ '@type': 'Organization', '@context': 'http://schema.org', name: 'Financial Times' });
		});

		it('sets isAccessibleForFree based upon content.accessLevel', function () {
			const result = article({ accessLevel: 'free' });
			expect(result.isAccessibleForFree).to.equal('True');
		});

		context('sets isPartOf.productID based upon content.accessLevel', function () {

			it('free content', function () {
				const result = article({ accessLevel: 'free' });
				expect(result.isAccessibleForFree).to.equal('True');
				expect(result.isPartOf.productID).to.equal('ft.com:free');
			});

			it('paywalled content', function () {
				const result = article({ accessLevel: 'premium' });
				expect(result.isAccessibleForFree).to.equal('False');
				expect(result.isPartOf.productID).to.equal('ft.com:premium');
			});

		});

	});

});
