const { expect } = require('chai');

const breadcrumb = require('../../types/breadcrumb');
const article = require('../fixtures/article_b.json');
describe('Type: Breadcrumb', function () {

	it('has correct base format', function () {
		const result = breadcrumb(article);
		expect(result).to.contain({ '@context': 'https://schema.org', '@type': 'BreadcrumbList' });
		expect(result.itemListElement.length).to.equals(3);
	});

	it('has correct hierarchy', function () {
		const result = breadcrumb(article);
		expect(result.itemListElement).to.deep.equal([

			{
				'@type': 'ListItem',
				'name': 'Companies',
				'item': 'https://www.ft.com/companies',
				'position': 1,

			},
			{
				'@type': 'ListItem',
				'name': 'European Union',
				'item': 'https://www.ft.com/european-union',
				'position': 2,
			},

			{
				'@type': 'ListItem',
				'name': 'EU tech regulation',
				'item': 'https://www.ft.com/stream/433acaac-f1b9-4925-b80c-4fb312c256d8',
				'position': 3,
			}]);
	});
});
