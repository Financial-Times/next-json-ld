const { expect } = require('chai');
const article = require('../../types/article');
const authorsJson = require('../fixtures/authors.json');
describe('Type: Article', function () {
	context('articleBody', function () {
		it('doesnt return if no text or html available', function () {
			const result = article({});
			expect(result.articleBody).to.be.undefined;
		});
		it('defaults to body text if available', function () {
			const result = article({
				bodyText: 'Hello, World.',
				bodyHTML: "<p>Hello I'm <blink>HTML</blink>!</p>"
			});
			expect(result.articleBody).to.equal('Hello, World.');
		});
		it('does not turn body HTML into text', function () {
			const result = article({
				bodyHTML: "<p>Hello I'm <blink>HTML</blink>!</p>"
			});
			expect(result.articleBody).to.be.undefined;
		});
	});

	context('Subscribe with Google', function () {
		it('has correct base format', function () {
			const result = article({});
			expect(result.isAccessibleForFree).to.equal('False');
			expect(result['@type']).to.equal('NewsArticle');
			expect(result.isPartOf).to.deep.equal({
				'@type': ['CreativeWork', 'Product'],
				name: 'Financial Times'
			});
			expect(result.publisher).to.contain({
				'@type': 'Organization',
				'@context': 'http://schema.org',
				name: 'Financial Times'
			});
		});

		it('sets isAccessibleForFree based upon content.accessLevel', function () {
			const result = article({ accessLevel: 'free' });
			expect(result.isAccessibleForFree).to.equal('True');
		});

		context(
			'sets isPartOf.productID based upon content.accessLevel',
			function () {
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
			}
		);
	});

	context('Authors', function () {
		it('authors content', function () {
			const result = article({ authorConcepts: authorsJson });
			expect(result.author.length).to.equal(3);
			authorsJson.forEach((item, index) => {
				expect(result.author[index].name).to.equal(item.prefLabel);
				expect(result.author[index]['@type']).to.equal('Person');
				expect(result.author[index].url.indexOf(item.relativeUrl) > 0).to.equal(
					true
				);
			});
		});
	});

	context('Date modified', () => {
		it('uses the modified timestamp if there is one', () => {
			const modifiedTimestamp = 1620859836929;
			const articleData = {
				modifiedTimestamp,
				publishedDate: "2021-05-12T22:30:36.929Z"
			};
			const result = article(articleData);
			expect(result.dateModified).to.equal(new Date(modifiedTimestamp).toISOString());
		});

		it('defaults to using publishedDate', () => {
			const publishedDate = "2021-05-12T22:30:36.929Z";
			const articleData = {
				publishedDate
			};
			const result = article(articleData);
			expect(result.dateModified).to.equal(publishedDate);
		});
	});
});
