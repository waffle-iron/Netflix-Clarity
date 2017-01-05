import Renderer from './renderer';
export default class Clarity{
	constructor(props) {
		this.valid = this.isNetflix();
		this.renderer = new Renderer();
	}

	load(){
		console.log("Load")
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