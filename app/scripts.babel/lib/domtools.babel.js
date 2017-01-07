'use strict';
import {MAIN_VIEW, MUTATION_OPTIONS, TILE_CLASS, MUTATION_PUBSUB, MUTATION_CLASS_NAME} from './constants.babel'


const attributeExceptions = [
`role`,
];

function appendText(el, text) {
	const textNode = document.createTextNode(text);
	el.appendChild(textNode);
}

function appendArray(el, children) {
	children.forEach((child) => {
		if (Array.isArray(child)) {
			appendArray(el, child);
		} else if (child instanceof window.Element) {
			el.appendChild(child);
		} else if (typeof child === `string`) {
			appendText(el, child);
		}
	});
}

function setStyles(el, styles) {
	if (!styles) {
		el.removeAttribute(`styles`);
		return;
	}

	Object.keys(styles).forEach((styleName) => {
		if (styleName in el.style) {
      el.style[styleName] = styles[styleName]; // eslint-disable-line no-param-reassign
  } else {
  	console.warn(`${styleName} is not a valid style for a <${el.tagName.toLowerCase()}>`);
  }
});
}

function makeElement(type, textOrPropsOrChild, ...otherChildren) {
	const el = document.createElement(type);

	if (Array.isArray(textOrPropsOrChild)) {
		appendArray(el, textOrPropsOrChild);
	} else if (textOrPropsOrChild instanceof window.Element) {
		el.appendChild(textOrPropsOrChild);
	} else if (typeof textOrPropsOrChild === `string`) {
		appendText(el, textOrPropsOrChild);
	} else if (typeof textOrPropsOrChild === `object`) {
		Object.keys(textOrPropsOrChild).forEach((propName) => {
			if (propName in el || attributeExceptions.includes(propName)) {
				const value = textOrPropsOrChild[propName];

				if (propName === `style`) {
					setStyles(el, value);
				} else if (value) {
					el[propName] = value;
				}
			} else {
				console.warn(`${propName} is not a valid property of a <${type}>`);
			}
		});
	}

	if (otherChildren) appendArray(el, otherChildren);

	return el;
}

const a = (...args) => makeElement(`a`, ...args);
const button = (...args) => makeElement(`button`, ...args);
const div = (...args) => makeElement(`div`, ...args);
const h1 = (...args) => makeElement(`h1`, ...args);
const header = (...args) => makeElement(`header`, ...args);
const p = (...args) => makeElement(`p`, ...args);
const span = (...args) => makeElement(`span`, ...args);


export default class DomTools {
	constructor(props) {
		let el = document.getElementsByClassName(MAIN_VIEW);
		if(!el) return;
		this.pubsub = props['pubsub'];
		if(el && !!el.length){
			this.setMutationObserver(el[0], MUTATION_OPTIONS, this.hasPopoverMutation.bind(this));
			
		}else{
			throw new Error('Cannot find MAIN_VIEW')
		}
		
	}

	setMutationObserver(target, options, cb){
		var observer = new MutationObserver(function(a) {
			cb(a)
		});

		if (target !== undefined && target.length !== undefined) {
			Array.prototype.map.call(target,function(elem) {
				observer.observe(target, options)
			});
		} else {
			target && observer.observe(target, options)
		}
	}
	getTiles(){
		return document.getElementsByClassName(TILE_CLASS);
	}
	checkForClass(elems){
		return Array.prototype.slice.call(elems).find(function(elem){
			if(!elem.classList) return false;
			return elem.classList.contains(MUTATION_CLASS_NAME)
		});
	}
	hasPopoverMutation(mutations){
		let validMutation = mutations.find((mutation)=>{
			return mutation && mutation.type === 'childList' && mutation.addedNodes.length > 0 && this.checkForClass(mutation.addedNodes);
		});

		if(validMutation){
			this.pubsub.publish(MUTATION_PUBSUB, {mutation: validMutation});
		}
	}
	injectHtml(el, data){
		let node = document.getElementById(el);
		let childReview = node.querySelector(':scope .nc-review')
		let poppedupEl = node.querySelector(':scope .bob-overlay');
		if(!node) return;
		

		let score = this.generateScore(data.imdbRating || 'N/A', data.tomatoMeter || 'N/A', data.Metascore || 'N/A');
		score.style.position = 'absolute';
		score.style.top = 0;
		score.style.right= 0;
		score.style.width ='50%';
		score.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
		score.style.padding = '5px';
		score.style.textAlign = 'center';

		node.appendChild(score);
		poppedupEl.appendChild(score);
	}
	generateScore(imdb, rt, meta){
		return div({ className: `nc-review` },
			div({ className: 'nc-review-inner'}, 
				p({}, `IMDB: ${imdb} RT: ${rt}, Meta: ${meta}`))
			); 
	}
}