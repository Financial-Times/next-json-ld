'use strict';

const organization = require('./types/organization');
const ftData = require('./data/ft');

function ft () {
	return organization(ftData);
}

module.exports = {
	ft,
	organization,
	newsArticle: require('./types/article'),
	person: require('./types/person'),
	webPage: require('./types/webpage'),
	video: require('./types/video'),
	barrier: require('./types/barrier'),
	liveBlog: require('./types/liveblog'),
	breadcrumb: require('./types/breadcrumb')
};
