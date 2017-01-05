'use strict';
import {TITLE_CLASS} from './constants';
export default class DomTools{
	constructor(props) {
	}

	getTiles(){
		return document.getElementsByClassName(TILE_CLASS);
	}
}