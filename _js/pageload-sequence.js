
import {$body, $window} from './globals.js';


const pageOutDuration = 500,
			$top = $('#top'),
			$loadscreen = $('#dhr-loadscreen');




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

	$loadscreen.velocity('transition.fadeOut', {duration:350});
};


if (window.Pace) {
	Pace.on('done', onFullPageload, window);
} else {
	//$window.on('load', onFullPageload);
}