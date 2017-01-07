import Renderer from './renderer.babel';
export default class Clarity{
	constructor(props) {
		this.valid = this.isNetflix();
		this.renderer = new Renderer();
	}

	load(){
		if(!this.valid){
			return;
		}

	}
	host(){
		return window.location.hostname;
	}
	
	isNetflix(){
		return /(netflix)/.test(this.host());
	}
}