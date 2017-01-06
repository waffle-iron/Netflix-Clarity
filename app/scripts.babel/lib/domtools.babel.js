'use strict';
const TILE_CLASS = 'title_card';
const MAIN_VIEW = 'mainView';
const MUTATION_OPTIONS = { childList: true, subtree: true };
const MUTATION_PUBSUB = 'bobtile-activated';

export default class DomTools {
	constructor(props) {
		let el = document.getElementsByClassName(MAIN_VIEW);
		this.pubsub = props["pubsub"];
		if(el && !!el.length){
			
			this.setMutationObserver(el[0], MUTATION_OPTIONS, this.hasPopoverMutation.bind(this));
			
		}else{
			throw new Error('Cannot find MAIN_VIEW')
		}
		
	}

	setMutationObserver(target, options, cb){
		var observer = new MutationObserver(function(a) {
			cb(a)
		});

		if (target !== undefined && target.length !== undefined) {
			Array.prototype.map.call(target,function(elem) {
				observer.observe(target, options)
			});
		} else {
			target && observer.observe(target, options)
		}
	}
	getTiles(){
		return document.getElementsByClassName(TILE_CLASS);
	}
	checkForClass(elems){
		return Array.prototype.slice.call(elems).find(function(elem){
			if(!elem.classList) return false;
			return elem.classList.contains('bob-card')
		});
	}
	hasPopoverMutation(mutations){
		let validMutation = mutations.find((mutation)=>{
			return mutation && mutation.type === 'childList' && mutation.addedNodes.length > 0 && this.checkForClass(mutation.addedNodes);
		});

		if(validMutation){
			this.pubsub.publish(MUTATION_PUBSUB, {mutation: validMutation});
		}
	}

}