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
	const highlLevelAnnotations = annotations.map(annotation => {
		annotation.predicateName = annotation.predicate.split('/').pop();
		return annotation;
	}).filter(annotation => predicateWeights[annotation.predicateName]);

	return highlLevelAnnotations.sort(orderByPredicateName).slice(0,maxTagNumber);
}

function getItemsFromAnnotation (annotations){
	if(annotations){
		return getHierarchyAnnotations(annotations);
	}
	return [];
}

function getItems (content){
	let items = getItemsFromAnnotation(content.annotations);
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
		return getBreadcrumbItem(index + 1,annotation.prefLabel,annotation.url);
	});
}


function getBreadcrumbItem (position,name,url){
	return {
		'@type': 'ListItem',
		'position': position,
		'name': name,
		'item': url
	};
}

module.exports = (content) => {
	const baseSchema = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		'itemListElement' : getBreadcrumbItems(content)
	};

	return baseSchema;
};
