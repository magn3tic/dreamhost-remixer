//plugins.min.js is loaded before the webpack bundle
//it is a bundle of jquery & plugins because some don't yet support es6 module

// simulate ios safari's autoplay disability:
// window.Modernizr.videoautoplay = false;
// $('html').addClass('no-videoautoplay');


import './utils.js'; //polyfills, small jquery plugs, etc... include first

import './general-ui.js'; //global functionality

import './pageload-sequence.js';
import './item-hover.js';
import './countdown.js';
import './contact-modal.js';
import './videoplayers.js';

import './scroll-ticker.js'; //raf

import './email-subscribe.js';

import './forms-ui.js';

import './social-sharing.js';

import {$body} from './globals.js';


//chromium detect - something breaks w/ 3d rendering in other engines
if (window.chrome) {
	$body.addClass('is-chromium');
} else {
	//not desktop chrome
}



// import DesignerOptions from './designer-options.js';
// const dopts = new DesignerOptions({
// 	options: {
// 		'blendmoded': 'Blend Mode On/Off',
// 		'hovertilt': 'Hover Tilt Effect'
// 	},
// 	stylesheet: 'assets/css/designer-options.css'
// });

// console.log(dopts);


// wtf
// $.Velocity.Easings.sitedefault = function(p, opts, tweenDelta) {
// 	return [0.175, 0.885, 0.32, 1.275];
// };














