'use strict';
import Raven from 'raven-js';
Raven.config('https://7ae7265cc3a547c7b2bc2abee13727e7@sentry.io/127366').install();

import NetflixClarity from './clarity.babel'
Raven.context(function(){
	let app = new NetflixClarity();
	app.load();	
})
