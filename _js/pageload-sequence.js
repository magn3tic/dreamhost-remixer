
import {$body, $window} from './globals.js';

const $transitionlinks = $('a[data-page-transition]');


$transitionlinks.click(function(event) {
	event.preventDefault();

	let href = $(this).attr('href');

	$body.addClass('is-pagetransitioning')
			 .velocity('scroll', {duration: 500});

	setTimeout(() => {
		window.location.replace(href);
	}, 500);
});


$window.on('load', () => { 
	$body.addClass('is-fullyloaded');
});