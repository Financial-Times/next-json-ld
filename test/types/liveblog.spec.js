const { expect } = require('chai');
const liveblog = require('../../types/liveblog');

describe('Type: liveBlogPosting', function () {

	context('Schema format', function () {
		it('should have the correct @type', () => {
			const result = liveblog({});
			expect(result['@type']).to.equal('LiveBlogPosting');
		})

		it('should have the required fields when passed adequate data', () => {
			const result = liveblog({"publishedDate": "2021-03-25T22:44:55.577Z","firstPublishedDate": "2021-03-25T00:14:12.161Z"});
			expect(Object.keys(result)).to.include.members(['@type', 'headline', 'datePublished', 'dateModified', 'coverageStartTime', 'coverageEndTime']);
			expect(result.isPartOf).to.deep.equal({ '@type': [ 'CreativeWork', 'Product' ], name: 'Financial Times' });
			expect(result.publisher).to.contain({ '@type': 'Organization', '@context': 'http://schema.org', name: 'Financial Times' });
		})

	})

	context('live blog Description', function () {

		it('defaults to content.alternativeTitles.promotionalTitle if it exist', function () {
			const result = liveblog({alternativeTitles : {promotionalTitle: 'I am an alternative title.'}});
			expect(result.description).to.equal('I am an alternative title.');
		});

		it('defaults to topper.headline if content.alternativeTitles.promotionalTitle doesn\'t exist', function () {
			const result = liveblog({topper: { headline: 'Hello, World.'}});
			expect(result.description).to.equal('Hello, World.');
		});

		it('turns content.summary.bodyHTML to text if topper.headline && content.alternativeTitles.promotionalTitle doesn\'t exist', function () {
			const result = liveblog({
				summary: {bodyHTML: '<p>Hello I\'m <blink>HTML</blink>!</p>'},
			});
			expect(result.description).to.equal('Hello I\'m HTML!');
		});
	});


	context('Subscribe with Google', function () {

		it('has correct base format', function () {
			const result = liveblog({});
			expect(result.isAccessibleForFree).to.equal('False');
			expect(result['@type']).to.equal('LiveBlogPosting');
			expect(result.isPartOf).to.deep.equal({ '@type': [ 'CreativeWork', 'Product' ], name: 'Financial Times' });
			expect(result.publisher).to.contain({ '@type': 'Organization', '@context': 'http://schema.org', name: 'Financial Times' });
		});

		it('sets isAccessibleForFree based upon content.accessLevel', function () {
			const result = liveblog({ accessLevel: 'free' });
			expect(result.isAccessibleForFree).to.equal('True');
		});

		context('sets isPartOf.productID based upon content.accessLevel', function () {

			it('free content', function () {
				const result = liveblog({ accessLevel: 'free' });
				expect(result.isAccessibleForFree).to.equal('True');
				expect(result.isPartOf.productID).to.equal('ft.com:free');
			});

			it('paywalled content', function () {
				const result = liveblog({ accessLevel: 'premium' });
				expect(result.isAccessibleForFree).to.equal('False');
				expect(result.isPartOf.productID).to.equal('ft.com:premium');
			});

		});

	});

});
