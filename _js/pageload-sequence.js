
import {$body, $window, easeOutBack} from './globals.js';



const $top = $('#top'),
			$loadscreen = $('#dhr-loadscreen'),

			$homevideo = $('#dhr-home-videoel'),
			homevideo = $homevideo[0];

const pageOutDuration = 500,
			isHomePage = $body.hasClass('dhr-currentpage-index');




const $transitionlinks = $('a[data-page-transition]');

$transitionlinks.click(function(event) {
	event.preventDefault();
	let href = $(this).attr('href');

	$top.velocity('scroll', {duration: pageOutDuration});
	$body.addClass('is-pagetransitioning').velocity('transition.fadeOut', {duration: pageOutDuration});
			 
	setTimeout(() => window.location.replace(href), pageOutDuration);
});








//on page fully loaded
const onFullPageload = () => {
	
	$body.addClass('is-fullyloaded');

	$loadscreen.velocity('transition.fadeOut', {duration:350, delay:150});

	if (isHomePage) {
		homevideo.play();
	}

};


if (window.Pace) {
	Pace.on('done', onFullPageload, window);
} else {
	$window.on('load', onFullPageload);
}