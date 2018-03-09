const { expect } = require('chai');
const barrier = require('../../types/barrier');

const mockArticle = require('../fixtures/article.json');

const mergeWithArticle = (data) => Object.assign({}, mockArticle, data);

describe('Type: Barrier', function () {

	context('standalone barrier (aka product selector)', function () {

		it('has correct base format', function () {
			const result = barrier();
			expect(result.isAccessibleForFree).to.be.undefined;
			expect(result['@type']).to.equal('CreativeWork');
			expect(result.isPartOf).to.deep.equal({ '@type': [ 'CreativeWork', 'Product' ], name: 'Financial Times' });
			expect(result.publisher).to.contain({ '@type': 'Organization', '@context': 'http://schema.org', name: 'Financial Times' });
		});

	});

	context('content paywall', function () {

		it('will not add newsArticle markup if not enough data is passed', function () {
			const result = barrier({});
			expect(result.isAccessibleForFree).to.be.undefined;
			expect(result['@type']).to.equal('CreativeWork');
			expect(result.isPartOf).to.deep.equal({ '@type': [ 'CreativeWork', 'Product' ], name: 'Financial Times' });
			expect(result.publisher).to.contain({ '@type': 'Organization', '@context': 'http://schema.org', name: 'Financial Times' });
		});

		it('has correct base format with data pertaining to requested content', function () {
			const result = barrier(mergeWithArticle({ accessLevel: 'foo' }));
			expect(result['@type']).to.equal('NewsArticle');
			expect(result.isAccessibleForFree).to.equal('False');
			expect(result.isPartOf).to.deep.equal({ '@type': [ 'CreativeWork', 'Product' ], name: 'Financial Times' });
			expect(result.publisher).to.contain({ '@type': 'Organization', '@context': 'http://schema.org', name: 'Financial Times' });
		});

		it('wont add productID entitlements label if no matching content.accessLevel', function () {
			const result = barrier(mergeWithArticle({ accessLevel: 'foo' }));
			expect(result['@type']).to.equal('NewsArticle');
			expect(result.isPartOf).to.deep.equal({ '@type': [ 'CreativeWork', 'Product' ], name: 'Financial Times' });
		});

		it('correctly formats productId entitlements label based upon content.accessLevel', function () {
			const mockContent = mergeWithArticle({ accessLevel: 'premium' });
			const result = barrier(mockContent);
			expect(result['@type']).to.equal('NewsArticle');
			expect(result.isPartOf.productID).to.equal('ft.com:premium');
		});

	});

});
