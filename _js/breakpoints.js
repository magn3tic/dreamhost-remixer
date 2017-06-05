
//todo - breakpoint helper ha



// class Breakpoint {

// 	constructor(options) {
// 		this.breakpoints = 
// 	}

// };


const breakpoints = ['sm', 'md', 'lg', 'xl', 'xxl'];

let getBreakpoint = () => {
	return window.getComputedStyle(document.querySelector('body'), ':before').getPropertyValue('content').replace(/\"/g,'');
},
breakpointUp = (bp) => {
	let bpArgIndex = breakpoints.indexOf(bp),
			currentBp = getBreakpoint(),
			currentBpIndex = breakpoints.indexOf(currentBp);
	return currentBpIndex >= bpArgIndex;
},
breakpointDown = (bp) => {
	let bpArgIndex = breakpoints.indexOf(bp),
			currentBp = getBreakpoint(),
			currentBpIndex = breakpoints.indexOf(currentBp);
	return currentBpIndex <= bpArgIndex;
},
breakpointBetween = (smallest, largest) => {

};

$(window).resize( () => {
	let isLg = breakpointUp('lg');
	console.log(isLg);
});