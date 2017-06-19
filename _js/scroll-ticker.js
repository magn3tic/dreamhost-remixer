

import {$body, $window, $siteheader, $sitemain, $sitefooter, easeOutBack} from './globals.js';
import Breakpoints from './breakpoints.js';

const bps = new Breakpoints();


//inview class toggling
const $inviewels = $('[data-inview]'),
inViewTicker = () => {
	$inviewels.each(function() {
		const $t = $(this);
		if ($t.inView(true)) {
			$t.addClass('is-inview');
		} else {
			$t.removeClass('is-inview');
		}
	});
};


// header behavior
export let headerheight = $siteheader.outerHeight(),
					 headertop = parseInt($siteheader.css('top')) + scrollDiff,
					 winheight = $window.height(),
					 docheight = $(document).height(),
					 scrollBefore = 0,
					 scrollCurrent = 0,
					 scrollDiff = 0,
					 headerInView = true,
					 didScroll = false;

let isSmallScreen = bps.breakpointDown('sm');

const scrollUpdate = () => {
	headerheight = $siteheader.outerHeight().toFixed(2);
	winheight = $window.height();
	scrollCurrent = $(window).scrollTop();
	scrollDiff = scrollBefore - scrollCurrent;
	headertop = parseInt($siteheader.css('top')) + scrollDiff;
	isSmallScreen = bps.breakpointDown('sm');
},

resizeUpdate = () => {
	//update everything that needs recalc when window resizes
};

const ticker = () => {
	if (didScroll) {
		scrollUpdate();

		inViewTicker();

		if (isSmallScreen) {
			$siteheader.attr('style','');
			return; 
		} 

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

