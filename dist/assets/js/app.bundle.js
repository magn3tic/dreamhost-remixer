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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
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
    $modalstaggeritems = $('.dhr-contactmodal--intro, .dhr-contactmodal--form, .dhr-contactmodal--btns, .dhr-contactmodal--social');

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
	$modalstaggeritems.velocity('transition.fadeIn', { stagger: 130, drag: true, duration: 350 });
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

var $hovercards = $('[data-hovercard]');

var getTransformValue = function getTransformValue() {
	var scaleAmount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

	var maxDeg = 7,
	    $t = $(this);

	var halfW = $t.width() / 2,
	    halfH = $t.height() / 2,
	    coorX = halfW - (event.pageX - $t.offset().left),
	    coorY = halfH - (event.pageY - $t.offset().top),
	    degX = (coorY / halfH * maxDeg).toFixed(2) + 'deg',
	    degY = -(coorX / halfW * maxDeg).toFixed(2) + 'deg';

	scaleAmount = scaleAmount ? scaleAmount.toString() : '1.03';

	console.log(scaleAmount);

	return 'translate3d(0, -2px, 0) scale(' + scaleAmount + ') rotateX(' + degX + ') rotateY(' + degY + ')';
};

$hovercards.each(function () {

	if (Modernizr.touchevents) return;

	var $t = $(this),
	    $parent = $t.parent(),
	    scaleVal = $t.data('hovercard-scale') || '';

	var mousedover = false;

	$t.hover(function () {
		$parent.addClass('is-hovering').siblings().addClass('is-nothovering');
		mousedover = true;
	}, function () {
		$parent.removeClass('is-hovering').siblings().removeClass('is-nothovering');
		mousedover = false;
	});

	$t.mousemove(function (event) {
		$t.css({
			'transform': getTransformValue.call($t, scaleVal)
		});
	});

	$t.mousedown(function () {});

	$t.mouseleave(function () {
		return $t.attr('style', '');
	});
});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _globals = __webpack_require__(0);

var pageOutDuration = 500,
    $top = $('#top'),
    $loadscreen = $('#dhr-loadscreen');

var $transitionlinks = $('a[data-page-transition]');

$transitionlinks.click(function (event) {
	event.preventDefault();
	var href = $(this).attr('href');

	$top.velocity('scroll', { duration: pageOutDuration });
	_globals.$body.addClass('is-pagetransitioning').velocity('transition.fadeOut', { duration: pageOutDuration });

	setTimeout(function () {
		return window.location.replace(href);
	}, pageOutDuration);
});

//on page fully loaded
var onFullPageload = function onFullPageload() {
	_globals.$body.addClass('is-fullyloaded');

	$loadscreen.velocity('transition.fadeOut', { duration: 350 });
};

if (window.Pace) {
	Pace.on('done', onFullPageload, window);
} else {
	//$window.on('load', onFullPageload);
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
var $f = exports.$f = {
	carousel: $('.dhr-episode-carousel'),
	isOpen: false
};

if ($f.carousel.length) {
	$f.carousel.flickity({
		cellAlign: "left",
		cellSelector: ".cell-img",
		prevNextButtons: false,
		contain: true
	});
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// in viewport test
window.$.fn.inView = function (partial) {
  var $t = $(this),
      $w = $(window),
      viewTop = $w.scrollTop(),
      viewBottom = viewTop + $w.height(),
      _top = $t.offset().top,
      _bottom = _top + $t.height(),
      compareTop = partial === true ? _bottom : _top,
      compareBottom = partial === true ? _top : _bottom;
  return compareBottom <= viewBottom && compareTop >= viewTop;
};

//raf polyfill
(function () {
  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];
  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
  }
  if (!window.requestAnimationFrame) window.requestAnimationFrame = function (callback, element) {
    var currTime = new Date().getTime();
    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
    var id = window.setTimeout(function () {
      callback(currTime + timeToCall);
    }, timeToCall);
    lastTime = currTime + timeToCall;
    return id;
  };
  if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function (id) {
    clearTimeout(id);
  };
})();

// jQuery throttle / debounce - v1.1 - 3/7/2010
// http://benalman.com/projects/jquery-throttle-debounce-plugin/
var $ = window.jQuery,
    jq_throttle;
$.throttle = jq_throttle = function jq_throttle(delay, no_trailing, callback, debounce_mode) {
  var timeout_id,
      last_exec = 0;
  if (typeof no_trailing !== 'boolean') {
    debounce_mode = callback;
    callback = no_trailing;
    no_trailing = undefined;
  }
  function wrapper() {
    var that = this,
        elapsed = +new Date() - last_exec,
        args = arguments;
    function exec() {
      last_exec = +new Date();
      callback.apply(that, args);
    };
    function clear() {
      timeout_id = undefined;
    };
    if (debounce_mode && !timeout_id) {
      exec();
    }
    timeout_id && clearTimeout(timeout_id);
    if (debounce_mode === undefined && elapsed > delay) {
      exec();
    } else if (no_trailing !== true) {
      timeout_id = setTimeout(debounce_mode ? clear : exec, debounce_mode === undefined ? delay - elapsed : delay);
    }
  };
  return wrapper;
};
$.debounce = function (delay, at_begin, callback) {
  return callback === undefined ? jq_throttle(delay, at_begin, false) : jq_throttle(delay, callback, at_begin !== false);
};

//centered popup windows
$.centeredPopup = function (options) {
  var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left,
      dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top,
      width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width,
      height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height,
      left = width / 2 - options.width / 2 + dualScreenLeft,
      top = height / 2 - options.height / 2 + dualScreenTop,
      newWindow = window.open(options.url, options.title, 'scrollbars=yes, width=' + options.width + ', height=' + options.height + ', top=' + top + ', left=' + left);
  if (window.focus) {
    newWindow.focus();
  }
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(6);

__webpack_require__(5);

__webpack_require__(2);

__webpack_require__(4);

__webpack_require__(1);

__webpack_require__(3);

var _globals = __webpack_require__(0);

// wtf
// $.Velocity.Easings.sitedefault = function(p, opts, tweenDelta) {
// 	return [0.175, 0.885, 0.32, 1.275];
// };


// set hero sizes (one fallback / one necessary)
//polyfills, small jquery plugs, etc... include first


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
_globals.$window.bind('resize load', $.debounce(300, false, setHeroSize));

//animated scroll links
var $scrollanchors = $('a[data-scroll]');

$scrollanchors.click(function (e) {
	e.preventDefault();
	$($(this).attr('href')).velocity('scroll', { duration: 750, easing: _globals.easeOutBack });
});

//skrollr
// if (!window.Modernizr.touchevents) {
// 	const skrolz = skrollr.init({forceHeight: false, smoothScrolling: false});
// 	$window.bind('load resize', () => skrolz.refresh());
// }


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

//inview class toggling
var $inviewels = $('[data-inview]'),
    inViewTicker = function inViewTicker() {
	$inviewels.each(function () {
		var $t = $(this);
		if ($t.inView(false)) {
			$t.addClass('is-inview');
		} else {
			$t.removeClass('is-inview');
		}
	});
};

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

		inViewTicker();

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
_globals.$window.on('resize', $.debounce(300, false, scrollUpdate));
_globals.$window.scroll(function () {
	return didScroll = true;
});

/***/ })
/******/ ]);