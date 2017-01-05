'use strict';
const TILE_CLASS = 'title_card';
export default class DomTools{
	constructor(props) {
	}

	getTiles(){
		return document.getElementsByClassName(TILE_CLASS);
	}
}