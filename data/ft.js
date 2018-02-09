module.exports = {
	prefLabel: 'Financial Times',
	legalName: 'The Financial Times Ltd.',
	logo: {
		url: 'http://im.ft-static.com/m/img/masthead_main.jpg',
		width: 435,
		height: 36
	},
	url: 'https://www.ft.com',
	twitterHandle: 'FT',
	facebookProfile: 'financialtimes',
	instagramProfile: 'financialtimes',
	youtubeProfile: 'FinancialTimesVideos',
	linkedinProfile: 'financial-times',
	entitlements: {
		// !Note that we do not (and should not) have a 'free':'ft.com:free' mapping.
		// We do not want to mark content as requiring a 'free' entitlement.
		registered: 'ft.com:registered',
		subscribed: 'ft.com:subscribed',
		premium: 'ft.com:premium'
	}
}
