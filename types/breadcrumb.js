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
function comparePredicates (a,b){
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

function getBreadcrumbItemFromDisplayConcept (displayConcept,position = 3){
	if(!displayConcept)
		return false;
	return getBreadcrumbItem(position,displayConcept.prefLabel,displayConcept.url);
}

function getHierarchyAnnotations (annotations){
	return annotations.map(annotation => {
		annotation.predicateName = annotation.predicate.split('/').pop();
		return annotation;
	}).filter(annotation => Object.keys(predicateWeights).includes(annotation.predicateName)).sort(comparePredicates)
		.splice(0,maxTagNumber);
}
function getBreadcrumbItemsFromAnnotation (annotations){
	if(annotations){
		return getHierarchyAnnotations(annotations)
			.map((annotation,index) => {
				return getBreadcrumbItem(index + 1,annotation.prefLabel,annotation.url);
			});

	}
	return [];
}

function repositioning (items){
	return items.map((item,index) => {
		item.position = index + 1;
		return item;
	});
}
function getBreadcrumbItems (content){
	let items = getBreadcrumbItemsFromAnnotation(content.annotations);
	const lastItem = getBreadcrumbItemFromDisplayConcept(content.displayConcept,items.length + 1);
	if(lastItem){
		let itemFound = items.find(item => item.name === lastItem.name );
		if(itemFound){
			items.splice(items.indexOf(itemFound),1);
		}
		else
			items.pop();
		items.push(lastItem);
		items = repositioning(items);
	}
	return items;
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
