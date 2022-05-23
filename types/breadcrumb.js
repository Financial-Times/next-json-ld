'use strict';

const predicateWeights = {
	'implicitlyAbout': 9,
	'about':8
};

const maxTagNumber = 3;

function countSlashes (string){
	if(!string) return 0;
	return string.split('/').length - 1;
}
function compareAlphabetical (a,b){
	if(a === b) {
		return 0;
	}

	if (a > b) {
		return 1;
	}

	return -1;

}
function orderByPredicateName (a,b){
	const weightA = predicateWeights[a.predicateName];
	const weightB = predicateWeights[b.predicateName];
	if(weightA === weightB){
		const diffSlashes = countSlashes(a.relativeUrl) - countSlashes(b.relativeUrl);
		if(diffSlashes === 0){
			//In case same slashes and same predicate we do alphabetical order
			return compareAlphabetical(a.prefLabel,b.prefLabel);
		}
		else{
			return diffSlashes;
		}
	}
	else{
		return weightB - weightA;
	}

}

function getHierarchyAnnotations (annotations){
	if (!annotations || (annotations && !annotations.length)) {
		return [];
	}
	const highlLevelAnnotations = annotations.map(annotation => {
		annotation.predicateName = annotation.predicate.split('/').pop();
		return annotation;
	}).filter(annotation => predicateWeights[annotation.predicateName]);

	return highlLevelAnnotations.sort(orderByPredicateName).slice(0,maxTagNumber);
}

function getItems (content){
	let items = getHierarchyAnnotations(content.annotations);
	const lastItem = content.displayConcept || null;
	if(lastItem){
		items = items.filter(item => item.prefLabel !== lastItem.prefLabel).slice(0 , maxTagNumber - 1);
		items.push(lastItem);
		return items;
	}
	return items ;
}

function getBreadcrumbItems (content){
	const items = getItems(content);
	return items.map((annotation,index) => {
		return getBreadcrumbItem(index,annotation.prefLabel,annotation.url);
	});
}


function getBreadcrumbItem (index,name,url){
	return {
		'@type': 'ListItem',
		'position': index + 1,
		'name': name,
		'item': url
	};
}

module.exports = (content) => {
	const items = getBreadcrumbItems(content);
	if(!items || items.length <= 0)
		return null;

	const baseSchema = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		'itemListElement' : items
	};

	return baseSchema;
};
