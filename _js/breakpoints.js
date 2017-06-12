// Breakpoints Class --------------------//

// usage: helper functions to test viewport size @ exact match w/ css
// window.matchMedia alternative
//
// Breakpoints({
// 	breakpoints: ['sm']
// })
//


const defaultBreakpoints = ['xs','sm','md','lg','xl','xxl'],
			defaultElement = document.querySelector('body'),
			getCurrent = () => window.getComputedStyle(defaultElement, ':before').getPropertyValue('content').replace(/\"/g,'');

let currentBpIndex = null,
		initialBp = getCurrent();



export default class Breakpoints {

	constructor(options) {
		options = options || {};
		this.breakpoints = options.breakpoints || defaultBreakpoints;
		this.element = options.element || defaultElement;
		
		this.refreshCurrentIndex();
		this.initbp = this.getCurrent();

		if (options.evented) {
			//todo: custom event 'breakpoints.xs.down'
		}
	}

	//get value of the pseudo-element
	getCurrent() {
		return window.getComputedStyle(this.element, ':before').getPropertyValue('content').replace(/\"/g,'');
	}

	emitEvents() {
		let newBp = getCurrent(),
				currBp = this.initBp;

		if (newBp !== currBp) {
			$(window).trigger('breakpoints.change');
			currBp = newBp;
		}
	}	

	refreshCurrentIndex() {
		currentBpIndex = this.breakpoints.indexOf(this.getCurrent());
	}

	breakpointUp(bp) {
		this.refreshCurrentIndex();
		let bpArgIndex = this.breakpoints.indexOf(bp);
		return currentBpIndex >= bpArgIndex;
	}

	breakpointDown(bp) {
		this.refreshCurrentIndex();
		const bpArgIndex = this.breakpoints.indexOf(bp);
		return currentBpIndex <= bpArgIndex;
	}

	breakpointBetween(min, max) {
		this.refreshCurrentIndex();
		const bpMinIndex = this.breakpoints.indexOf(min),
					bpMaxIndex = this.breakpoints.indexOf(max);
		return currentBpIndex >= bpMinIndex && currentBpIndex <= bpMaxIndex;
	}
};

