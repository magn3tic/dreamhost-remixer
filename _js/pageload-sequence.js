
//import SplitText from './splittext.js';
import {$body, $window, easeOutBack, fadeIn} from './globals.js';
import {inViewTicker, ticker} from './scroll-ticker.js';


const $top = $('#top'),
			$loadscreen = $('#dhr-loadscreen'),
			$homevideo = $('#dhr-home-videoel');

export const homevideo = $homevideo.length === 1 ? $homevideo[0] : false;

const pageOutDuration = 500,
			isHomePage = $body.hasClass('dhr-currentpage-index') || $('#dhr-episodes-list').length;
	




//internal links - on navigate away
const $transitionlinks = $('a[data-page-transition]');

$transitionlinks.click(function(event) {

	//disabling for now - need to keep browser history intact
	return;

	if (!window.Modernizr.history || !window.Modernizr.localstorage) return;
	
	event.preventDefault();
	let href = $(this).attr('href');

	if (href.indexOf('#') === 0) return; 

	$top.velocity('scroll', {duration: pageOutDuration});
	$body.addClass('is-pagetransitioning').velocity('transition.fadeOut', {duration: pageOutDuration});

	//window.history.pushState({}, '', href);
			 
	setTimeout(() => {
		window.location.replace(href);
	}, pageOutDuration);
});









//on page fully loaded
const onFullPageload = () => {

	$body.addClass('is-fullyloaded');
	$top.velocity('scroll', {duration:50});

	$loadscreen.velocity('transition.fadeOut', {duration:400, delay:20, complete: () => {}});

	window.setTimeout(() => {
		inViewTicker.call();
		ticker.call();
	}, 150);
	
	if (isHomePage) {
		homevideo.play();
	}
};


if (window.Pace) {
	Pace.on('done', onFullPageload, window);
} else {
	$window.on('load', onFullPageload);
}