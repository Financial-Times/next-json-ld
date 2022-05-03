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
		expect(result.itemListElement).to.deep.equal([{
			'@type': 'ListItem',
			'name': 'World',
			'item': 'https://www.ft.com/world',
			'position': 1,
		},
		{
			'@type': 'ListItem',
			'name': 'Emerging markets',
			'item': 'https://www.ft.com/emerging-markets',
			'position': 2,

		},
		{
			'@type': 'ListItem',
			'name': 'Coronavirus pandemic',
			'item': 'https://www.ft.com/coronavirus',
			'position': 3,
		}]);
	});
});
