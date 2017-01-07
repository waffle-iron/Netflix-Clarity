'use strict';
import DomTools from './domtools.babel';
import {MUTATION_PUBSUB } from './constants.babel';
import api from './api.babel';
import PubSub from './pubsub.babel.js';
export default class Renderer{
	constructor(props) {
		this.pubsub = new PubSub();
		this.domTools = new DomTools({
			pubsub: this.pubsub
		});

		this.pubsub.subscribe(MUTATION_PUBSUB, this.getMetaData.bind(this))
	
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
		let self = this;
		console.log(self);
		let result = api(data.name, data.year)
		.then((response) =>{
			this.domTools.injectHtml(node.id, response);
		})
		
	}
}