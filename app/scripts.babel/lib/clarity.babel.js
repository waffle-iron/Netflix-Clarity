import Renderer from './renderer.babel';
export default class Clarity{
	constructor(props) {
		this.valid = this.isNetflix();
	}

	load(){
		if(!this.valid){
			return;
		}
		this.renderer = new Renderer();
	}
	host(){
		return window.location.hostname;
	}
	
	isNetflix(){
		return /(netflix)/.test(this.host());
	}
}