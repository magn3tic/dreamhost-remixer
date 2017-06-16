//plugins.min.js is loaded before the webpack bundle
//it is a bundle of jquery & plugins because some don't yet support es6 module


import './utils.js'; //polyfills, small jquery plugs, etc... include first


import './general-ui.js'; //global functionality

import './pageload-sequence.js';
import './item-hover.js';
import './countdown.js';
import './contact-modal.js';
import './videoplayers.js';

import './scroll-ticker.js'; //raf


// import DesignerOptions from './designer-options.js';
// const dopts = new DesignerOptions({
// 	options: {
// 		'blendmoded': 'Blend Mode On/Off',
// 		'hovertilt': 'Hover Tilt Effect'
// 	},
// 	stylesheet: 'assets/css/designer-options.css'
// });


// wtf
// $.Velocity.Easings.sitedefault = function(p, opts, tweenDelta) {
// 	return [0.175, 0.885, 0.32, 1.275];
// };














