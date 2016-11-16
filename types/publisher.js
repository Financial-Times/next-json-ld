'use strict';

const image = require('./image');
const organization = require('./organization');

module.exports = () => {
	const logo = {
		url: "http://im.ft-static.com/m/img/masthead_main.jpg",
		width: 435,
		height: 36
	};
	const company = {
		name: 'The Financial Times'
	}

	const basePublisher = {
		"publisher": {}
	};

	Object.assign(basePublisher.publisher, { logo: image(logo) });
	Object.assign(basePublisher.publisher, organization(company));

	return basePublisher;
}
