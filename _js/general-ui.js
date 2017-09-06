

import {$body, $window, $sitefooter, needsVideoSwap, isAutoplayLink, getVideoHtml, getRandomIndex} from './globals.js';
import {isHomePage} from './pageload-sequence.js';
import {trackFacebookEvent} from './email-subscribe.js';




//randomize index page feature
const $episodeItem = $('.dhr-episodeitem');

if ($episodeItem.length) {
	let stories = [];
	$episodeItem.each((i, el) => {
		const $t = $(el);
		stories.push({
			prefix: $t.data('story-prefix'),
			name: $t.data('story-username'),
			biz: $t.data('story-userbiz'),
			vimeo: $t.data('story-vimeo')
		})
	});

	const rindex = getRandomIndex(stories);
	const currentStory = stories[rindex];

	$episodeItem.eq(rindex).addClass('is-activestory');

}




$.fn.myplugin = function(opts) {
	var def = {};
	var s = $.extend(opts, def);
};




//trigger click for autoplay links
if (isAutoplayLink && !isHomePage) {
	$(document).on('dhr.pagereveal', () => {
		$('[data-video-target]').first().trigger('click');
		window.location.hash = '';
	});
}

//background video hero video fallback
const backgroundVideoFallback = () => {
	const $bgvideo = $('#dhr-home-videoel');
	const bgimg = $bgvideo.attr('poster');
	$bgvideo.parent('.dhr-fixedhero--outer').html('').css({
		backgroundImage: 'url('+bgimg+')'
	}).addClass('is-fallback');
};

let videoFallbackRan = false;
let mdzChecker = null;
if (Modernizr.videoautoplay === false) {
 	backgroundVideoFallback();
} else if (Modernizr.videoautoplay === undefined) {
	mdzChecker = setInterval(() => {
		if (Modernizr.videoautoplay !== undefined && Modernizr.videoautoplay !== true && !videoFallbackRan) {
			backgroundVideoFallback();
			$(this).trigger('modernizr.finished');
			videoFallbackRan = true;
		}
	}, 5);
}
$(document).on('modernizr.finished', () => {
	clearInterval(mdzChecker);
});



//fallback for html5/plyr videos (force the native player)
if (needsVideoSwap) {
	$body.addClass('has-mobile-ua');

	if (isHomePage) {
		const $el = $('#dhr-hero-embedtarget');
		const videoHtml = '<div>'+getVideoHtml($el.data('poster'), $el.data('video'))+'</div>';
		const $heroplay = $('.dhr-hero--play');

		$heroplay.addClass('has-fallback').html(videoHtml)
			.find('video').on('click', () => trackFacebookEvent($el.data('facebook-event')));

	} else {
		const $vidcard = $('.dhr-videocard');
		const $vidlink = $vidcard.find('a[data-video]');
		const $el = $($vidlink.data('video-target'));
		const vidcardimg = $vidcard.find('img').attr('src');
		const videoHtml = '<div style="background-image:url('+vidcardimg+')">'+getVideoHtml($el.data('poster'), $el.data('video'))+'</div>';

		$vidcard.addClass('has-fallback').html(videoHtml)
			.find('video').on('click', () => trackFacebookEvent($el.data('facebook-event')));
	}
}



//single episode carousels
const $carousel = $('.dhr-episode-carousel');
if ($carousel.length) {
	const flkty = $carousel.flickity({
		cellAlign: "left",
		cellSelector: ".cell-img",
		prevNextButtons: false,
		contain: true,
		lazyLoad: true,
		imagesLoaded: true
	}).data('flickity');

	$window.on('load', () => flkty.reloadCells());
}


//next episode blocks
const $nextEpBlock = $('.dhr-nextepisode');
const $nextEpAnchor = $('.dhr-nextepisode > a');

$nextEpAnchor.on('click', (event) => {
	if ($nextEpBlock.hasClass('is-comingsoon')) {
		event.preventDefault();
		$sitefooter.velocity('scroll', {duration:400, easing:'easeOutQuart', offset:100, complete: () => {
			$sitefooter.find('input[type="email"]').focus();
		}});
	}
});


//features page video play btn
const $featuresVideoBtn = $('#dhr-features-vidbtn');
$featuresVideoBtn.on('click', () => $('.dhr-videocard--link').trigger('click'));



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
	$($(this).attr('href')).velocity('scroll', {duration: 900, easing:'easeOutQuart'});
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