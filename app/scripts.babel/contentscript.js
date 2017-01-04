'use strict';
const TILE_CLASS = 'title_card';

class DomTools{
	constructor(props) {
	}

	getTiles(){
		return document.getElementsByClassName(TILE_CLASS);
	}
}



class RenderResults{
	constructor(props) {
		this.domTools = new DomTools();
		this.tiles = this.domTools.getTiles();
	}

	render(){
		this.tiles.forEach((tile) =>{
			console.log(tile.getAttribute("aria-label"))
		})
	}


}

class Clarity{
	constructor(props) {
		this.valid = this.isNetflix();
		this.renderer = new RenderResults();
	}

	load(){
		if(!this.valid){
			return;
		}
		this.renderer.render();
	}
	host(){
		return window.location.hostname;
	}
	//Private
	isNetflix(){
		console.log(this.host())
		return /(netflix)/.test(this.host());
	}
}

let app = new Clarity();
app.load();