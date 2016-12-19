'use strict';

module.exports = (data, type) => {
	const sameAs = [];
	
	if (data.twitterHandle) {
		sameAs.push(`https://www.twitter.com/${data.twitterHandle}`);
	}
	
	if (data.facebookProfile) {
		sameAs.push(`https://www.facebook.com/${data.facebookProfile}`);
	}

	if (data.linkedinProfile) {
		if (type === 'person') {
			sameAs.push(`https://www.linkedin.com/in/${data.linkedinProfile}`);
		} else if (type === 'organization') {
			sameAs.push(`https://www.linkedin.com/company/${data.linkedinProfile}`);
		}
	}
	
	if (data.youtubeProfile) {
		sameAs.push(`https://www.youtube.com/user/${data.youtubeProfile}`);
	}
	
	if (data.instagramProfile) {
		sameAs.push(`https://www.instagram.com/${data.instagramProfile}`);
	}

	return sameAs;
}
