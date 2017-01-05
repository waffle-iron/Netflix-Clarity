'use strict';
import {LABEL_ATTR} from './constants';
import DomTools from './domtools';

export default class Renderer{
	constructor(props) {
		this.domTools = new DomTools();
		this.tiles = this.domTools.getTiles();
	}

	render(){
	console.log(this.tiles);
	}
}