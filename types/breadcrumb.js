'use strict';

const predicateWeights = {
	'implicitlyAbout': 9,
	'about':8
};

const maxTagNumber = 3;

function countSlashes (str){
	if(!str) return 0;
	return (str.match(/\//g) || []).length;
}

function comparePredicates (a,b){
	let weightA = predicateWeights[a.predicateName];
	let weightB = predicateWeights[b.predicateName];
	if(weightA === weightB){
		let diffSlashes = countSlashes(a.relativeUrl) - countSlashes(b.relativeUrl);
		if(diffSlashes === 0){
			//In case same slashes and same predicate we set the current order
			return 1;
		}
		else{
			return diffSlashes;
		}
	}
	else{
		return weightA - weightB;
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
		.splice(2,maxTagNumber);
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
	let lastItem = getBreadcrumbItemFromDisplayConcept(content.displayConcept,items.length + 1);
	if(lastItem){
		let found = false;
		if(found = items.find(item => item.name === lastItem.name ))
			items.splice(items.indexOf(found),1);
		else
			items.shift();
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
	let baseSchema = {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		'itemListElement' : getBreadcrumbItems(content)
	};

	return baseSchema;
};
