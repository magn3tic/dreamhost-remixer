/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var $f = exports.$f = {
	carousel: $('.dhr-episode-carousel'),
	isOpen: false
};

$f.carousel.flickity({
	cellAlign: "left",
	cellSelector: ".cell-img",
	prevNextButtons: false,
	contain: true
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

//"globals"
var $body = $('body'),
    $window = $(window); //plugins.min.js is loaded before the webpack bundle
//it is a bundle of jquery & plugins because some don't yet support es6 module


var easeOutBack = [0.175, 0.985, 0.35, 1.05];

// wtf
// $.Velocity.Easings.sitedefault = function(p, opts, tweenDelta) {
// 	return [0.175, 0.885, 0.32, 1.275];
// };


// set hero sizes (one fallback / one necessary)
var $fixedautoheight = $('.dhr-fixedhero--autoheight'),
    $fixedheroimg = $('.dhr-fixedhero--outer'),
    $heroviewport = $('.dhr-hero'),
    isFullheightHero = $fixedautoheight.length === 0;
var setHeroSize = function setHeroSize() {
	var heightToSet = isFullheightHero ? $window.height() : $heroviewport.outerHeight() + 105;
	$fixedheroimg.css({ height: heightToSet + 'px' });
};
setHeroSize();
$window.bind('resize load', setHeroSize);

//animated scroll links
var $scrollanchors = $('a[data-scroll]');

$scrollanchors.click(function (e) {
	e.preventDefault();
	$($(this).attr('href')).velocity('scroll', { duration: 750, easing: easeOutBack });
});

// mobile nav toggle
var $mainnav = $('#dhr-mainnav'),
    $navtoggle = $('#dhr-menu-toggle');

var mainNavOpen = false;

$navtoggle.on('click', function (event) {
	event.preventDefault();

	//debounces clicks
	if ($mainnav.hasClass('velocity-animating')) {
		return;
	}

	if (mainNavOpen) {
		$mainnav.velocity('slideUp', { duration: 400, easing: 'easeOutQuart', complete: function complete() {
				$body.removeClass('dhr-is-mainnavshowing');
			} });
		mainNavOpen = false;
	} else {
		$mainnav.velocity('slideDown', { duration: 700, easing: 'easeOutQuart' });
		$body.addClass('dhr-is-mainnavshowing');
		mainNavOpen = true;
	}
});

// header behavior
var $siteheader = $('#dhr-header');

var headerheight = $siteheader.outerHeight(),
    headertop = parseInt($siteheader.css('top')) + scrollDiff,
    winheight = $window.height(),
    docheight = $(document).height(),
    scrollBefore = 0,
    scrollCurrent = 0,
    scrollDiff = 0,
    headerInView = true,
    didScroll = false;

var scrollUpdate = function scrollUpdate() {
	headerheight = $siteheader.outerHeight().toFixed(2);
	winheight = $window.height();
	scrollCurrent = $(window).scrollTop();
	scrollDiff = scrollBefore - scrollCurrent;
	headertop = parseInt($siteheader.css('top')) + scrollDiff;
},
    resizeUpdate = function resizeUpdate() {
	//update everything that needs recalc when window resizes
};

var ticker = function ticker() {
	if (didScroll) {
		scrollUpdate();

		if (scrollCurrent <= 0) {
			//if back at window top
			$siteheader.css('top', 0).addClass('at-page-top');
		} else if (scrollDiff > 0) {
			//back up from downscroll
			$siteheader.css('top', headertop > 0 ? 0 : headertop);

			if (scrollCurrent > headerheight + 30) {
				$siteheader.removeClass('at-page-top');
			}
		} else if (scrollDiff < 0) {
			if (scrollCurrent + winheight >= docheight - headerheight) {
				//just reached page bottom
				$siteheader.css('top', (headertop = scrollCurrent + winheight - docheight) < 0 ? headertop : 0);
				$siteheader.removeClass('at-page-top');
			} else {
				//$siteheader.removeClass('at-page-top');
				$siteheader.css('top', Math.abs(headertop) > headerheight ? -headerheight : headertop);
			}
		}
		scrollBefore = scrollCurrent;

		didScroll = false;
	}
	requestAnimationFrame(ticker);
};

ticker.call();
$window.resize(scrollUpdate);
$window.scroll(function () {
	return didScroll = true;
});

// Contact Modal
var $modaltrigger = $('a[href="#contact"]'),
    $modalclose = $('#dhr-modalclose'),
    $modal = $('#dhr-contactmodal'),
    $modalbody = $('.dhr-contactmodal--body'),
    $modaltop = $('.dhr-contactmodal--top'),
    $maincontent = $('#dhr-main');

//opening
$modaltrigger.on('click', function () {
	$modalbody.css({ height: ($window.height() - $modaltop.outerHeight()) * 0.87 });
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
$modalclose.on('click', function () {
	$modal.velocity({
		translateY: ['100%', '0%']
	}, {
		duration: 250,
		display: 'none',
		complete: function complete() {
			return $body.removeClass('is-showing-contactmodal');
		}
	});
	// $maincontent.velocity({
	// 	translateY: 0
	// }, {
	// 	duration: 0
	// });
});

$window.resize(function () {
	return $modalbody.css({ height: $window.height() - $modaltop.outerHeight() - 5 });
});

if (window.location.hash === '#contact') {
	$modaltrigger.trigger('click');
}

/***/ })
/******/ ]);