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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
						value: true
});

//"globals"
var $body = exports.$body = $('body'),
    $window = exports.$window = $(window),
    $siteheader = exports.$siteheader = $('#dhr-header'),
    $sitemain = exports.$sitemain = $('#dhr-main'),
    $sitefooter = exports.$sitefooter = $('#dhr-footer'),
    easeOutBack = exports.easeOutBack = [0.0755, 0.985, 0.325, 1.07];

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _globals = __webpack_require__(0);

// Contact Modal
var $modaltrigger = $('a[href="#contact"]'),
    $modalclose = $('#dhr-modalclose'),
    $modal = $('#dhr-contactmodal'),
    $modalbody = $('.dhr-contactmodal--body'),
    $modaltop = $('.dhr-contactmodal--top'),
    $maincontent = $('#dhr-main'),
    $fixedhero = $('.dhr-fixedhero'),
    $movecontents = $maincontent.add($fixedhero).add(_globals.$sitefooter),
    $modalstaggeritems = $('.dhr-contactmodal--intro h5, .dhr-contactmodal--intro h2, .dhr-contactmodal--intro p, .dhr-contactmodal--form p, .dhr-contactmodal--btns, .dhr-contactmodal--social');

//$modalstaggeritems.css({display:'none',opacity:0});

//opening
$modaltrigger.on('click', function (e) {
	e.preventDefault();
	$modalbody.css({ height: (_globals.$window.height() - $modaltop.outerHeight()) * 0.87 });
	$modal.velocity({
		translateY: ['0%', '-100%']
	}, {
		duration: 600,
		display: 'block',
		easing: _globals.easeOutBack
	});
	$modalstaggeritems.velocity('transition.slideDownIn', { stagger: 90, drag: true, duration: 350 });
	$movecontents.velocity({
		translateY: _globals.$window.height()
	}, {
		easing: _globals.easeOutBack,
		duration: 600
	});

	_globals.$body.addClass('is-showing-contactmodal');
});

//closing
$modalclose.on('click', function () {
	$modal.velocity({
		translateY: ['-100%', '0%']
	}, {
		duration: 350,
		display: 'none',
		easing: 'easeOutCirc',
		complete: function complete() {
			_globals.$body.removeClass('is-showing-contactmodal');
			//$modalstaggeritems.css({display:'none'});
		}
	});
	//$modalstaggeritems.velocity('transition.fadeOut', {duration:100})
	$movecontents.velocity({
		translateY: 0
	}, {
		easing: 'easeOutCirc',
		duration: 350
	});
});

_globals.$window.resize(function () {
	return $modalbody.css({ height: _globals.$window.height() - $modaltop.outerHeight() - 5 });
});

if (window.location.hash === '#contact') {
	$modaltrigger.trigger('click');
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $lockedepisodes = $('.dhr-episodeitem--locked'),
    cdSec = 1000,
    cdMin = cdSec * 60,
    cdHr = cdMin * 60,
    cdDay = cdHr * 24;

var currentdate = new Date(),
    currentepoch = currentdate.getTime();

//new time every second
window.setInterval(function () {
	currentdate = new Date();
	currentepoch = currentdate.getTime();
	$(document).trigger('clocktick');
}, 1000);

//helpers
var doHtmlUpdate = function doHtmlUpdate($html, until) {
	var divisions = Object.keys(until);
	for (var i = 0; i < divisions.length; i++) {
		$html[divisions[i]].text(until[divisions[i]]);
	}
};
var digitPrefixer = function digitPrefixer(digit) {
	var strdigit = digit.toString(),
	    result = strdigit.length > 1 ? strdigit : '0' + strdigit;
	//console.log(result);
	return result;
};

//go through each locked episode
$lockedepisodes.each(function (index, item) {

	var $this = $(item),
	    $countdown = $this.find('[data-countdown]'),
	    unlockepoch = parseInt($countdown.data('countdown')),
	    unlocktime = new Date(unlockepoch),
	    $html = {
		days: $countdown.find('[data-countdown-days] .dhr-countdown--num'),
		hours: $countdown.find('[data-countdown-hours] .dhr-countdown--num'),
		mins: $countdown.find('[data-countdown-mins] .dhr-countdown--num'),
		sec: $countdown.find('[data-countdown-sec] .dhr-countdown--num')
	};

	var timeDiff = unlockepoch - currentepoch,
	    until = {
		days: digitPrefixer(Math.floor(timeDiff / cdDay)),
		hours: digitPrefixer(Math.floor(timeDiff % cdDay / cdHr)),
		mins: digitPrefixer(Math.floor(timeDiff % cdHr / cdMin)),
		sec: digitPrefixer(Math.floor(timeDiff % cdMin / cdSec))
	};

	doHtmlUpdate($html, until);

	//every second
	$(document).on('clocktick', function () {
		timeDiff = unlockepoch - currentepoch;
		until.days = digitPrefixer(Math.floor(timeDiff / cdDay));
		until.hours = digitPrefixer(Math.floor(timeDiff % cdDay / cdHr));
		until.mins = digitPrefixer(Math.floor(timeDiff % cdHr / cdMin));
		until.sec = digitPrefixer(Math.floor(timeDiff % cdMin / cdSec));
		doHtmlUpdate($html, until);
	});

	$this.click(function (event) {
		return event.preventDefault();
	}).addClass('is-countdownstarted');
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _globals = __webpack_require__(0);

var $transitionlinks = $('a[data-page-transition]');

$transitionlinks.click(function (event) {
	event.preventDefault();

	var href = $(this).attr('href');

	_globals.$body.addClass('is-pagetransitioning').velocity('scroll', { duration: 500 });

	setTimeout(function () {
		window.location.replace(href);
	}, 500);
});

_globals.$window.on('load', function () {
	_globals.$body.addClass('is-fullyloaded');
});

/***/ }),
/* 4 */
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
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(4);

__webpack_require__(2);

__webpack_require__(3);

__webpack_require__(1);

var _globals = __webpack_require__(0);

// wtf
// $.Velocity.Easings.sitedefault = function(p, opts, tweenDelta) {
// 	return [0.175, 0.885, 0.32, 1.275];
// };


// set hero sizes (one fallback / one necessary)
var $fixedautoheight = $('.dhr-fixedhero--autoheight'),
    $fixedheroimg = $('.dhr-fixedhero--outer'),
    $heroviewport = $('.dhr-hero'),
    isFullheightHero = $fixedautoheight.length === 0; //plugins.min.js is loaded before the webpack bundle
//it is a bundle of jquery & plugins because some don't yet support es6 module


var setHeroSize = function setHeroSize() {
	var heightToSet = isFullheightHero ? _globals.$window.height() : $heroviewport.outerHeight() + 105;
	$fixedheroimg.css({ height: heightToSet + 'px' });
};
setHeroSize();
_globals.$window.bind('resize load', setHeroSize);

//animated scroll links
var $scrollanchors = $('a[data-scroll]');

$scrollanchors.click(function (e) {
	e.preventDefault();
	$($(this).attr('href')).velocity('scroll', { duration: 750, easing: _globals.easeOutBack });
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
				_globals.$body.removeClass('dhr-is-mainnavshowing');
			} });
		mainNavOpen = false;
	} else {
		$mainnav.velocity('slideDown', { duration: 700, easing: 'easeOutQuart' });
		_globals.$body.addClass('dhr-is-mainnavshowing');
		mainNavOpen = true;
	}
});

// header behavior

var headerheight = _globals.$siteheader.outerHeight(),
    headertop = parseInt(_globals.$siteheader.css('top')) + scrollDiff,
    winheight = _globals.$window.height(),
    docheight = $(document).height(),
    scrollBefore = 0,
    scrollCurrent = 0,
    scrollDiff = 0,
    headerInView = true,
    didScroll = false;

var scrollUpdate = function scrollUpdate() {
	headerheight = _globals.$siteheader.outerHeight().toFixed(2);
	winheight = _globals.$window.height();
	scrollCurrent = $(window).scrollTop();
	scrollDiff = scrollBefore - scrollCurrent;
	headertop = parseInt(_globals.$siteheader.css('top')) + scrollDiff;
},
    resizeUpdate = function resizeUpdate() {
	//update everything that needs recalc when window resizes
};

var ticker = function ticker() {
	if (didScroll) {
		scrollUpdate();

		if (scrollCurrent <= 0) {
			//if back at window top
			_globals.$siteheader.css('top', 0).addClass('at-page-top');
		} else if (scrollDiff > 0) {
			//back up from downscroll
			_globals.$siteheader.css('top', headertop > 0 ? 0 : headertop);

			if (scrollCurrent > headerheight + 30) {
				_globals.$siteheader.removeClass('at-page-top');
			}
		} else if (scrollDiff < 0) {
			if (scrollCurrent + winheight >= docheight - headerheight) {
				//just reached page bottom
				_globals.$siteheader.css('top', (headertop = scrollCurrent + winheight - docheight) < 0 ? headertop : 0);
				_globals.$siteheader.removeClass('at-page-top');
			} else {
				//$siteheader.removeClass('at-page-top');
				_globals.$siteheader.css('top', Math.abs(headertop) > headerheight ? -headerheight : headertop);
			}
		}
		scrollBefore = scrollCurrent;

		didScroll = false;
	}
	requestAnimationFrame(ticker);
};

ticker.call();
_globals.$window.resize(scrollUpdate);
_globals.$window.scroll(function () {
	return didScroll = true;
});

/***/ })
/******/ ]);