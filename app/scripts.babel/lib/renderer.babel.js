'use strict';
const LABEL_ATTR = 'aria-label';
import DomTools from './domtools.babel';

export default class Renderer{
	constructor(props) {
		this.domTools = new DomTools();
		this.tiles = this.domTools.getTiles();
	}

	render(){
	console.log(this.tiles);
	}
}