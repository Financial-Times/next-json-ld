const { expect } = require('chai');
const liveblog = require('../../types/liveblog');
const { posts } = require('../fixtures/liveblog.json');

describe('Type: liveBlogPosting', function () {
	context('Schema format', function () {
		it('should have the correct @type', () => {
			const result = liveblog({});
			expect(result['@type']).to.equal('LiveBlogPosting');
		});

		it('should have the required fields when passed adequate data', () => {
			const result = liveblog({
				publishedDate: '2021-03-25T22:44:55.577Z',
				firstPublishedDate: '2021-03-25T00:14:12.161Z'
			});
			expect(Object.keys(result)).to.include.members([
				'@type',
				'headline',
				'datePublished',
				'dateModified',
				'coverageStartTime',
				'coverageEndTime'
			]);
			expect(result.isPartOf).to.deep.equal({
				'@type': ['CreativeWork'],
				name: 'Financial Times'
			});
			expect(result.publisher).to.contain({
				'@type': 'Organization',
				'@context': 'http://schema.org',
				name: 'Financial Times'
			});
		});
	});

	context('Live blog Description', function () {
		it('defaults to content.alternativeTitles.promotionalTitle if it exist', function () {
			const result = liveblog({
				alternativeTitles: { promotionalTitle: 'I am an alternative title.' }
			});
			expect(result.description).to.equal('I am an alternative title.');
		});

		it("defaults to topper.headline if content.alternativeTitles.promotionalTitle doesn't exist", function () {
			const result = liveblog({ topper: { headline: 'Hello, World.' } });
			expect(result.description).to.equal('Hello, World.');
		});

		it("turns content.summary.bodyHTML to text if topper.headline && content.alternativeTitles.promotionalTitle doesn't exist", function () {
			const result = liveblog({
				summary: { bodyHTML: "<p>Hello I'm <blink>HTML</blink>!</p>" }
			});
			expect(result.description).to.equal("Hello I'm HTML!");
		});
	});

	context('Coverage times', function () {
		it('should have the correct coverage times', () => {
			const result = liveblog({
				publishedDate: '2021-04-28T20:59:10+01:00',
				firstPublishedDate: '2021-04-28T20:59:10+01:00'
			});
			expect(Object.keys(result)).to.include.members([
				'coverageStartTime',
				'coverageEndTime'
			]);
			expect(result['coverageStartTime']).to.equal('2021-04-28T20:59:10+01:00');
			expect(result['coverageEndTime']).to.equal('2021-04-28T21:00:10+01:00');
		});

		it('coverageEndTime should be a minute after coverageStartTime', () => {
			const result = liveblog({
				publishedDate: '2021-04-28T20:59:10+01:00',
				firstPublishedDate: '2021-04-28T20:59:10+01:00'
			});
			expect(result['coverageEndTime']).to.equal('2021-04-28T21:00:10+01:00');
		});

		it('coverageEndTime should remain same day if published a minute before the end of the day', () => {
			const result = liveblog({
				publishedDate: '2021-04-28T23:59:10+01:00',
				firstPublishedDate: '2021-04-28T23:59:10+01:00'
			});
			expect(Object.keys(result)).to.include.members([
				'coverageStartTime',
				'coverageEndTime'
			]);
			expect(result['coverageEndTime']).to.equal('2021-04-28T23:59:59+01:00');
		});
	});

	context('Subscribe with Google', function () {
		it('has correct base format', function () {
			const result = liveblog({});
			expect(result.isAccessibleForFree).to.equal('False');
			expect(result['@type']).to.equal('LiveBlogPosting');
			expect(result.isPartOf).to.deep.equal({
				'@type': ['CreativeWork'],
				name: 'Financial Times'
			});
			expect(result.publisher).to.contain({
				'@type': 'Organization',
				'@context': 'http://schema.org',
				name: 'Financial Times'
			});
		});

		it('sets isAccessibleForFree based upon content.accessLevel', function () {
			const result = liveblog({ accessLevel: 'free' });
			expect(result.isAccessibleForFree).to.equal('True');
		});

		context(
			'sets isPartOf.productID based upon content.accessLevel',
			function () {
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
			}
		);
	});

	context('liveBlogUpdate field', function () {
		it('should have liveBlogUpdate field if liveblogpackage has posts field', () => {
			const result = liveblog({
				publishedDate: '2021-03-25T22:44:55.577Z',
				firstPublishedDate: '2021-03-25T00:14:12.161Z',
				posts
			});
			expect(Array.isArray(result.liveBlogUpdate)).to.be.true;
			expect(result.liveBlogUpdate).to.not.be.empty;
			expect(Object.keys(result.liveBlogUpdate[0])).to.include.members([
				'@type',
				'headline',
				'datePublished'
			]);
		});
	});

	context('articleBody field', function () {
		it('uses the content bodyText property', () => {
			const postWithBodyText = posts[0];
			const result = liveblog({ posts: [postWithBodyText] });
			expect(result.liveBlogUpdate[0].articleBody).to.equal(
				postWithBodyText.bodyText
			);
		});

		it("doesn't use the content bodyHTML when bodyText is unavailable", () => {
			const postWithoutBodyText = posts[1];
			const result = liveblog({ posts: [postWithoutBodyText] });
			expect(result.liveBlogUpdate[0].articleBody).to.be.undefined;
		});
	});

	context('dateModified field', function () {
		it('should have dateModified should equal date published field of first post if posts field exists', () => {
			const result = liveblog({
				publishedDate: '2021-03-25T22:44:55.577Z',
				firstPublishedDate: '2021-03-25T00:14:12.161Z',
				posts
			});
			expect(result.dateModified).to.equal(posts[0].publishedDate);
		});
	});
});
