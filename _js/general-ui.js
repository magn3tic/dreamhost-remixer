

import {$body, $window} from './globals.js';


//single episode carousels
const $carousel = $('.dhr-episode-carousel');
if ($carousel.length) {
	const flkty = $carousel.flickity({
		cellAlign: "left",
		cellSelector: ".cell-img",
		prevNextButtons: false,
		contain: true,
		lazyLoad: true
	}).data('flickity');
}



//lazy background images
const $lazybgimgs = $('[data-lazy-bg]');

const loadLazyBgimages = () => {
	$lazybgimgs.each(function() {
		const $t = $(this),
					imgUrl = $t.data('lazy-bg'),
					img = new Image();

		img.onload = () => {
			$t.css({backgroundImage:`url(${imgUrl})`})
				.velocity('transition.fadeIn', {visbility:'visible', duration:1500});
		};
		img.src = imgUrl;
	});
};

if ($lazybgimgs.length > 0) {
	$window.on('load', () => setTimeout(loadLazyBgimages, 500));
}



// set hero sizes (one fallback / one necessary)
const $fixedautoheight = $('.dhr-fixedhero--autoheight'),
			$fixedheroimg = $('.dhr-fixedhero--outer'),
			$heroviewport = $('.dhr-hero'),
			isFullheightHero = $fixedautoheight.length === 0;
const setHeroSize = () => {
	let heightToSet = isFullheightHero ? $window.height() : $heroviewport.outerHeight()+105;
	$fixedheroimg.css({height: heightToSet+'px'})
};
setHeroSize();
$window.on('resize', $.debounce(300, false, setHeroSize));
$window.bind('load', setHeroSize);




//animated scroll links
const $scrollanchors = $('a[data-scroll]');
$scrollanchors.click(function(e) {
	e.preventDefault();
	$($(this).attr('href')).velocity('scroll', {duration: 750, easing: 'easeOutCirc'});
});



// mobile nav toggle
const $mainnav = $('#dhr-mainnav'),
			$navtoggle = $('#dhr-menu-toggle');
export let mainNavOpen = false;

$navtoggle.on('click', (event) => {
	event.preventDefault();

	//debounces clicks
	if ($mainnav.hasClass('velocity-animating')) {return;}

	if (mainNavOpen) {
		$mainnav.velocity('slideUp', {duration:400,easing:'easeOutQuart', complete: () => {
			$body.removeClass('dhr-is-mainnavshowing');
		}});
		mainNavOpen = false;
	} else {
		$mainnav.velocity('slideDown', {duration:700,easing:'easeOutQuart'});
		$body.addClass('dhr-is-mainnavshowing');
		mainNavOpen = true;
	}
});