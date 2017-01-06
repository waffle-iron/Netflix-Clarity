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

			const OMDB_ENDPOINT = 'https://www.omdbapi.com/?plot=short&r=json&tomatoes=true';

			// let title = "The OA";
			// let year = 2016
			fetch(`${OMDB_ENDPOINT}&t=${data.name}&y=${data.year}`).then(function(res){
				res.json().then(function(data) {  
			        console.log(data);  
			      }); 
			})

		//TODO: Initiate request
	}
}