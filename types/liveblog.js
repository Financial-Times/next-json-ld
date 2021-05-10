'use strict';

const htmlToText = require('html-to-text');
const image = require('./image');
const organization = require('./organization');
const product = require('./product');
const ftData = require('../data/ft');
const moment = require('moment');

/**
 * Gets the coverageEndTime for a liveBlogPosting by adding one minute to the coverageStartTime.
 *
 * Expects coverageStartTime to be in the following format 2021-04-28T20:59:10+01:00
 *
 * @param {(string|moment.Moment)} coverageStartTime
 * @returns {string} formatted date string
 */
function getCoverageEndTime (coverageStartTime) {
	let startTime = moment(coverageStartTime).utcOffset(coverageStartTime);
	if (moment(startTime).add(1, 'minute').isBefore(moment(startTime).endOf('day'))) {
		return moment(startTime).add(1, 'minute').format();
	}

	return moment(startTime).endOf('day').format();
}

/**
 * Returns the coverageEndTime and coverageEndTime of a live-blog-post.
 *
 * Does this by adding one minute to the publishedDate. If adding one minute takes
 * the date to the next day, it sets the date to the end of the current day.
 *
 * @param {Object} content
 * @returns {{coverageStartTime: string, coverageEndTime: string}}
 */
function getcoverageTimes (content) {
	const publishedDate = content.firstPublishedDate || content.publishedDate;
	const coverageStartTime = publishedDate;
	let coverageEndTime = getCoverageEndTime(coverageStartTime);
	return { coverageStartTime, coverageEndTime };
}

function getLiveBlogDescription (content) {
	if (content.alternativeTitles) {
		return content.alternativeTitles.promotionalTitle;
	}

	if (content.topper) {
		return content.topper.headline;
	}

	if (content.summary) {
		return htmlToText.fromString(content.summary.bodyHTML);
	}

	return '';
}

module.exports = (content) => {
	let baseSchema = {
		'@context': 'http://schema.org',
		'@type': 'LiveBlogPosting',
		'url': content.canonicalUrl,
		'headline': content.title,
		'datePublished': content.firstPublishedDate || content.publishedDate,
		'dateModified': content.publishedDate,
		'isAccessibleForFree': content.accessLevel && content.accessLevel === 'free' ? 'True' : 'False'
	};

	baseSchema = {
		...baseSchema,
		isPartOf: product(ftData, content),
		publisher: organization(ftData),
		description: getLiveBlogDescription(content),
		...getcoverageTimes(content)
	};

	if (content.alternativeTitles && content.alternativeTitles.promotionalTitle) {
		baseSchema = { ...baseSchema, alternativeHeadline: content.alternativeTitles.promotionalTitle };
	}

	if (content.mainImage) {
		baseSchema = { ...baseSchema, image: image(content.mainImage) };
	}

	return baseSchema;
};