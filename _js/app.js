//plugins.min.js is loaded before the webpack bundle
//it is a bundle of jquery & plugins because some don't yet support es6 module


import './sliders.js';


//"globals"
const $body = $('body'),
			$window = $(window),
			$siteheader = $('#dhr-header'),
			$sitemain = $('#dhr-main'),
			$sitefooter = $('#dhr-footer');
const easeOutBack = [0.175, 0.985, 0.35, 1.05];


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
$window.bind('resize load', setHeroSize);




//animated scroll links
const $scrollanchors = $('a[data-scroll]');

$scrollanchors.click(function(e) {
	e.preventDefault();
	$($(this).attr('href')).velocity('scroll', {duration: 750, easing: easeOutBack})
});





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




// header behavior
const $siteheader = $('#dhr-header');

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
$window.resize(scrollUpdate);
$window.scroll(() => didScroll = true);





// Contact Modal
const $modaltrigger = $('a[href="#contact"]'),
			$modalclose = $('#dhr-modalclose'),
			$modal = $('#dhr-contactmodal'),
			$modalbody = $('.dhr-contactmodal--body'),
			$modaltop = $('.dhr-contactmodal--top'),
			$maincontent = $('#dhr-main');

//opening
$modaltrigger.on('click', () => {
	$modalbody.css({height: ($window.height()-$modaltop.outerHeight())*0.87 });
	$modal.velocity({
		translateY: ['0%', '-100%']
	}, {
		duration: 750,
		display: 'block',
		easing: easeOutBack
	});
	// $maincontent.velocity({
	// 	translateY: $window.height()*0.9
	// }, {
	// 	easing: easeOutBack,
	// 	duration: 750
	// });
	$body.addClass('is-showing-contactmodal');
});

//closing
$modalclose.on('click', () => {
	$modal.velocity({
		translateY: ['100%', '0%']
	}, {
		duration: 250,
		display: 'none',
		complete: () => $body.removeClass('is-showing-contactmodal')
	});
	// $maincontent.velocity({
	// 	translateY: 0
	// }, {
	// 	duration: 0
	// });
});

$window.resize(() => $modalbody.css({height:$window.height()-$modaltop.outerHeight()-5}));

if (window.location.hash === '#contact') {
	$modaltrigger.trigger('click');
}
