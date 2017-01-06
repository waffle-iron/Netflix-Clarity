'use strict';
const LABEL_ATTR = 'aria-label';
import DomTools from './domtools.babel';
const MUTATION_PUBSUB = 'bobtile-activated';

import PubSub from './pubsub.babel.js';
export default class Renderer{
	constructor(props) {
		this.pubsub = new PubSub();
		this.domTools = new DomTools({
			pubsub: this.pubsub
		});

		this.pubsub.subscribe(MUTATION_PUBSUB, this.getMetaData)
	}



	getMetaData(e){
		let node = e.mutation.target.parentElement;
		if(!node) return;
		let nameNode = node.querySelector('.bob-title');
		let yearNode = node.querySelector(':scope .year');
		let data = {
			name: nameNode === null ? null : nameNode.textContent,
			year:  yearNode === null ? null : yearNode.textContent,
			inProgress: node.querySelector(':scope .progress') !== null
		}
		//TODO: Initiate request
	}
}