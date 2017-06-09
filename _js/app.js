//plugins.min.js is loaded before the webpack bundle
//it is a bundle of jquery & plugins because some don't yet support es6 module


import './utils.js'; //polyfills, small jquery plugs, etc... include first


import './sliders.js';
import './countdown.js';
import './pageload-sequence.js';
import './contact-modal.js';
import './item-hover.js';


import {$body, $window, $siteheader, $sitemain, $sitefooter, easeOutBack} from './globals.js';


// wtf
// $.Velocity.Easings.sitedefault = function(p, opts, tweenDelta) {
// 	return [0.175, 0.885, 0.32, 1.275];
// };



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
$window.bind('resize load', $.debounce(300, false, setHeroSize) );




//animated scroll links
const $scrollanchors = $('a[data-scroll]');

$scrollanchors.click(function(e) {
	e.preventDefault();
	$($(this).attr('href')).velocity('scroll', {duration: 750, easing: easeOutBack})
});




//skrollr
// if (!window.Modernizr.touchevents) {
// 	const skrolz = skrollr.init({forceHeight: false, smoothScrolling: false});
// 	$window.bind('load resize', () => skrolz.refresh());
// }




// mobile nav toggle
const $mainnav = $('#dhr-mainnav'),
			$navtoggle = $('#dhr-menu-toggle');

let mainNavOpen = false;

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





//inview class toggling
const $inviewels = $('[data-inview]'),

inViewTicker = () => {
	$inviewels.each(function() {
		const $t = $(this);
		if ($t.inView(false)) {
			$t.addClass('is-inview');
		} else {
			$t.removeClass('is-inview');
		}
	});
};


// header behavior
let headerheight = $siteheader.outerHeight(),
		headertop = parseInt($siteheader.css('top')) + scrollDiff,
		winheight = $window.height(),
		docheight = $(document).height(),
		scrollBefore = 0,
		scrollCurrent = 0,
		scrollDiff = 0,
		headerInView = true,
		didScroll = false;


const scrollUpdate = () => {
	headerheight = $siteheader.outerHeight().toFixed(2);
	winheight = $window.height();
	scrollCurrent = $(window).scrollTop();
	scrollDiff = scrollBefore - scrollCurrent;
	headertop = parseInt($siteheader.css('top')) + scrollDiff;
},

resizeUpdate = () => {
	//update everything that needs recalc when window resizes
};

const ticker = () => {
	if (didScroll) {
		scrollUpdate();

		inViewTicker();

		if (scrollCurrent <= 0) {
			//if back at window top
			$siteheader.css('top', 0).addClass('at-page-top');
		} else if (scrollDiff > 0) {
			//back up from downscroll
			$siteheader.css('top', headertop > 0 ? 0 : headertop);

			if (scrollCurrent > headerheight+30) {
				$siteheader.removeClass('at-page-top');
			}

		} else if (scrollDiff < 0) {
			if (scrollCurrent + winheight >= docheight - headerheight) {
				//just reached page bottom
				$siteheader.css('top', (headertop = scrollCurrent + winheight - docheight ) < 0 ? headertop : 0);
				$siteheader.removeClass('at-page-top');
			} else {
				//$siteheader.removeClass('at-page-top');
				$siteheader.css('top', Math.abs(headertop) > headerheight ? -headerheight : headertop );
			}
		}
		scrollBefore = scrollCurrent;

		didScroll = false;
	}
	requestAnimationFrame(ticker);
};

ticker.call();
$window.on('resize', $.debounce(300, false, scrollUpdate));
$window.scroll(() => didScroll = true);















