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
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
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
    $top = exports.$top = $('#top'),
    $siteheader = exports.$siteheader = $('#dhr-header'),
    $sitemain = exports.$sitemain = $('#dhr-main'),
    $sitefooter = exports.$sitefooter = $('#dhr-footer'),
    easeOutBack = exports.easeOutBack = [0.0755, 0.985, 0.325, 1.07];

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.homevideo = undefined;

var _splittext = __webpack_require__(13);

var _splittext2 = _interopRequireDefault(_splittext);

var _globals = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var $top = $('#top'),
    $loadscreen = $('#dhr-loadscreen'),
    $homevideo = $('#dhr-home-videoel');

var homevideo = exports.homevideo = $homevideo.length === 1 ? $homevideo[0] : false;

var pageOutDuration = 500,
    isHomePage = _globals.$body.hasClass('dhr-currentpage-index');

//animation prep stuff / on domready
var $spltels = $('.dhr-preheadline, .dhr-sectionheadline, .dhr-mainheadline'),
    splttxt = new _splittext2.default($spltels, { type: 'lines' });

var unwrapSplitText = function unwrapSplitText(elements) {
	elements.forEach(function (item, i) {
		return $(item).unwrap();
	});
};

splttxt.lines.forEach(function (item, i) {
	$(item).wrap('<div class="dhr-splttxt-line"></div>').css({ opacity: 0 });
});

//internal links - on navigate away
var $transitionlinks = $('a[data-page-transition]');

$transitionlinks.click(function (event) {
	//if (!window.Modernizr.history) return;

	event.preventDefault();
	var href = $(this).attr('href');

	if (href.indexOf('#') === 0) return;

	$top.velocity('scroll', { duration: pageOutDuration });
	_globals.$body.addClass('is-pagetransitioning').velocity('transition.fadeOut', { duration: pageOutDuration });

	setTimeout(function () {
		return window.location.replace(href);
	}, pageOutDuration);
});

//on page fully loaded
var onFullPageload = function onFullPageload() {

	_globals.$body.addClass('is-fullyloaded');

	$top.velocity('scroll', { duration: 50 });

	splttxt.lines.forEach(function (item, index) {
		$(item).velocity({
			translateY: ['0px', '50px'],
			opacity: [1, 0]
		}, {
			easing: 'easeOutQaurt',
			duration: 500,
			delay: 100 * index,
			complete: function complete() {}
		});
	});

	$loadscreen.velocity('transition.fadeOut', { duration: 330, delay: 100 });

	if (isHomePage) {
		homevideo.play();
	}
};

if (window.Pace) {
	Pace.on('done', onFullPageload, window);
} else {
	_globals.$window.on('load', onFullPageload);
}

/***/ }),
/* 2 */
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

var $form = $('#dhr-contact-form'),
    $inputs = {
	email: $('#dhr-email-input'),
	firstname: $('#dhr-contact-firstname-input'),
	lastname: $('#dhr-contact-lastname-input')
};

//opening
$modaltrigger.on('click', function (e) {
	e.preventDefault();
	$modalbody.css({ height: (_globals.$window.height() - $modaltop.outerHeight()) * 0.9 });
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
		duration: 600,
		complete: function complete() {
			return $inputs.firstname.focus();
		}
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
/* 3 */
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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _globals = __webpack_require__(0);

var $sendgridEmailInput = null,
    $sendgridEmailLabel = null,
    $sendgridFormEl = null,
    $sendgridSubmit = null,
    $sendgridNewSubmit = null;

var $sendgridForm = $('.sendgrid-subscription-widget'),
    loadSendgridLib = $.getScript('//s3.amazonaws.com/subscription-cdn/0.2/widget.min.js'),
    submitBtnHtml = '<span class="sr-only">Submit</span><svg x="0px" y="0px" viewBox="0 0 180 135"><path class="st0" d="M105.5,16.4L105.5,16.4c-3.9,3.9-3.9,10.2,0,14.1L132,57H23.1c-5.5,0-10,4.5-10,10c0,5.5,4.5,10,10,10h108.6l-26.5,26.5c-3.9,3.9-3.9,10.2,0,14.1v0c3.9,3.9,10.2,3.9,14.1,0L163,73.9c3.9-3.9,3.9-10.2,0-14.1l-43.3-43.3C115.8,12.5,109.4,12.5,105.5,16.4"></svg>';

//subscribe form event handlers
$sendgridForm.on({
	ready: function ready() {
		$sendgridFormEl = $sendgridForm.find('form');
		$sendgridEmailInput = $sendgridForm.find('input[name="email"]');
		$sendgridEmailLabel = $sendgridEmailInput.parent('label');
		$sendgridSubmit = $sendgridForm.find('input[type="submit"]');

		$sendgridEmailInput.attr({ placeholder: 'your.name@email.com', autocomplete: 'off', required: 'true' });
		$sendgridEmailInput.after('<span class="dhr-footer--emailborder"></span>');
		$sendgridEmailInput.prev('span').addClass('sr-only').wrap('<label></label>');

		$sendgridFormEl.wrapInner('<div class="inner-large"></div>');
		$sendgridEmailLabel.add($sendgridSubmit).wrapAll('<div class="dhr-formfield"></div>');
		$sendgridSubmit.wrap('<button class="dhr-footer--submit" type="submit"></button>');

		$sendgridNewSubmit = $sendgridForm.find('.dhr-footer--submit');

		$sendgridEmailLabel.contents().unwrap();
		$sendgridNewSubmit.html(submitBtnHtml);
	},
	sent: function sent(e) {
		$sendgridForm.removeClass('is-error is-success is-submitted').addClass('is-submitting');
		$sendgridNewSubmit.attr('disabled', true);
	},
	error: function error() {
		$sendgridNewSubmit.removeAttr('disabled');
		$sendgridForm.removeClass('is-submitting').addClass('is-submitted is-error');
	},
	success: function success() {
		$sendgridNewSubmit.removeAttr('disabled');
		$sendgridForm.removeClass('is-error is-submitting').addClass('is-submitted is-success');
	}
});

loadSendgridLib.done(function (script, status) {});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _globals = __webpack_require__(0);

var $form = $('#dhr-contact-form'),
    $fields = $form.find('input, select');

var filledInCheck = function filledInCheck($field, $outer) {
	if ($field.val().length > 0) {
		$outer.addClass('is-filledin');
	} else {
		$outer.removeClass('is-filledin');
	}
};

$fields.each(function () {
	var $t = $(this),
	    $outer = $t.parent('.dhr-inlineform--input'),
	    isSelect = $outer.data('field-type') === 'select';

	if (isSelect) {

		$t.on('change', function () {
			return filledInCheck($t, $outer);
		});
	} else {

		$t.on('keyup keydown blur', function () {
			return filledInCheck($t, $outer);
		});
	}
});

$form.on('submit', function (e) {

	e.preventDefault();

	//do validation
	var formData = $form.serialize();
	console.log(formData);

	$.ajax({
		url: 'https://formspree.io/colin@mag.cr',
		method: 'POST',
		dataType: 'json',
		data: formData
	});
});

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.mainNavOpen = undefined;

var _globals = __webpack_require__(0);

//single episode carousels
var $carousel = $('.dhr-episode-carousel');
if ($carousel.length) {
	var flkty = $carousel.flickity({
		cellAlign: "left",
		cellSelector: ".cell-img",
		prevNextButtons: false,
		contain: true,
		lazyLoad: true
	}).data('flickity');
}

//lazy background images
var $lazybgimgs = $('[data-lazy-bg]');

var loadLazyBgimages = function loadLazyBgimages() {
	$lazybgimgs.each(function () {
		var $t = $(this),
		    imgUrl = $t.data('lazy-bg'),
		    img = new Image();

		img.onload = function () {
			$t.css({ backgroundImage: 'url(' + imgUrl + ')' }).velocity('transition.fadeIn', { visbility: 'visible', duration: 1500 });
		};
		img.src = imgUrl;
	});
};

if ($lazybgimgs.length > 0) {
	_globals.$window.on('load', function () {
		return setTimeout(loadLazyBgimages, 500);
	});
}

// set hero sizes (one fallback / one necessary)
var $fixedautoheight = $('.dhr-fixedhero--autoheight'),
    $fixedheroimg = $('.dhr-fixedhero--outer'),
    $heroviewport = $('.dhr-hero'),
    isFullheightHero = $fixedautoheight.length === 0;
var setHeroSize = function setHeroSize() {
	var heightToSet = isFullheightHero ? _globals.$window.height() : $heroviewport.outerHeight() + 105;
	$fixedheroimg.css({ height: heightToSet + 'px' });
};
setHeroSize();
_globals.$window.on('resize', $.debounce(300, false, setHeroSize));
_globals.$window.bind('load', setHeroSize);

//animated scroll links
var $scrollanchors = $('a[data-scroll]');
$scrollanchors.click(function (e) {
	e.preventDefault();
	$($(this).attr('href')).velocity('scroll', { duration: 900, easing: 'easeInOutCirc' });
});

// mobile nav toggle
var $mainnav = $('#dhr-mainnav'),
    $navtoggle = $('#dhr-menu-toggle');
var mainNavOpen = exports.mainNavOpen = false;

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
		exports.mainNavOpen = mainNavOpen = false;
	} else {
		$mainnav.velocity('slideDown', { duration: 700, easing: 'easeOutQuart' });
		_globals.$body.addClass('dhr-is-mainnavshowing');
		exports.mainNavOpen = mainNavOpen = true;
	}
});

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _globals = __webpack_require__(0);

var $hovercards = $('[data-hovercard]');

var getTransformValue = function getTransformValue() {
	var scaleAmount = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
	var maxDeg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;

	var $t = $(this);

	var halfW = $t.width() / 2,
	    halfH = $t.height() / 2,
	    coorX = halfW - (event.pageX - $t.offset().left),
	    coorY = halfH - (event.pageY - $t.offset().top),
	    degX = coorY / halfH * maxDeg + 'deg',
	    degY = -(coorX / halfW * maxDeg) + 'deg';

	scaleAmount = scaleAmount ? scaleAmount.toString() : '1.03';

	return 'translateY(-2px) scale(' + scaleAmount + ') rotateX(' + degX + ') rotateY(' + degY + ')';
};

var getMousedownTransform = function getMousedownTransform() {};

$hovercards.each(function () {

	if (Modernizr.touchevents) return;

	var $t = $(this),
	    $parent = $t.parent(),
	    isEpisode = $parent.hasClass('dhr-episodeitem'),
	    scaleVal = $t.data('hovercard-scale') || '',
	    tiltVal = $t.data('hovercard-tilt') || 7;

	if (!window.chrome && isEpisode) return;

	var mousedover = false;

	$t.hover(function () {
		$parent.addClass('is-hovering');
		if (isEpisode) {
			$parent.siblings().addClass('is-nothovering');
		}
		mousedover = true;
	}, function () {
		$parent.removeClass('is-hovering');
		if (isEpisode) {
			$parent.siblings().removeClass('is-nothovering');
		}
		mousedover = false;
	});

	$t.on('mousemove', function (event) {
		$t.css({ transform: getTransformValue.call($t, scaleVal, tiltVal) });
	});

	$t.mousedown(function () {
		if (mousedover) {
			//do a push-down effect
		}
	});

	$t.mouseleave(function () {
		return $t.attr('style', '');
	});
});

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.didScroll = exports.headerInView = exports.scrollDiff = exports.scrollCurrent = exports.scrollBefore = exports.docheight = exports.winheight = exports.headertop = exports.headerheight = undefined;

var _globals = __webpack_require__(0);

var _breakpoints = __webpack_require__(12);

var _breakpoints2 = _interopRequireDefault(_breakpoints);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bps = new _breakpoints2.default();

//inview class toggling
var $inviewels = $('[data-inview]'),
    inViewTicker = function inViewTicker() {
	$inviewels.each(function () {
		var $t = $(this);
		if ($t.inView(true)) {
			$t.addClass('is-inview');
		} else {
			$t.removeClass('is-inview');
		}
	});
};

// header behavior
var headerheight = exports.headerheight = _globals.$siteheader.outerHeight(),
    headertop = exports.headertop = parseInt(_globals.$siteheader.css('top')) + scrollDiff,
    winheight = exports.winheight = _globals.$window.height(),
    docheight = exports.docheight = $(document).height(),
    scrollBefore = exports.scrollBefore = 0,
    scrollCurrent = exports.scrollCurrent = 0,
    scrollDiff = exports.scrollDiff = 0,
    headerInView = exports.headerInView = true,
    didScroll = exports.didScroll = false;

var isSmallScreen = bps.breakpointDown('sm');

var scrollUpdate = function scrollUpdate() {
	exports.headerheight = headerheight = _globals.$siteheader.outerHeight().toFixed(2);
	exports.winheight = winheight = _globals.$window.height();
	exports.scrollCurrent = scrollCurrent = $(window).scrollTop();
	exports.scrollDiff = scrollDiff = scrollBefore - scrollCurrent;
	exports.headertop = headertop = parseInt(_globals.$siteheader.css('top')) + scrollDiff;
	isSmallScreen = bps.breakpointDown('sm');
},
    resizeUpdate = function resizeUpdate() {
	//update everything that needs recalc when window resizes
};

var ticker = function ticker() {
	if (didScroll) {
		scrollUpdate();

		inViewTicker();

		if (isSmallScreen) {
			_globals.$siteheader.attr('style', '');
			return;
		}

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
			// if (scrollCurrent + winheight >= docheight - headerheight) {
			// 	//just reached page bottom
			// 	$siteheader.css('top', (headertop = scrollCurrent + winheight - docheight ) < 0 ? headertop : 0);
			// 	$siteheader.removeClass('at-page-top');
			// } else {
			//$siteheader.removeClass('at-page-top');
			_globals.$siteheader.css('top', Math.abs(headertop) > headerheight ? -headerheight : headertop);
			//}
		}
		exports.scrollBefore = scrollBefore = scrollCurrent;

		exports.didScroll = didScroll = false;
	}
	requestAnimationFrame(ticker);
};

ticker.call();
_globals.$window.on('resize', $.debounce(300, false, scrollUpdate));
_globals.$window.scroll(function () {
	return exports.didScroll = didScroll = true;
});

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//allows designer options to be removed for production w/o error
window.designerOptions = window.designerOptions || {};

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
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _globals = __webpack_require__(0);

var _pageloadSequence = __webpack_require__(1);

var $homeherotop = $('#dhr-hero-top'),
    $homeherobot = $('#dhr-hero-bottom'),
    $episodelist = $('#dhr-episode-list'),
    $playbtns = $('a[data-video]'),
    isHomePage = _globals.$body.hasClass('dhr-currentpage-index');

var isPlaying = false;

$playbtns.each(function (index) {

	var $t = $(this),
	    $target = $($t.data('video-target')),
	    $targetparent = $target.parent('.dhr-fluidvideo'),
	    videopath = $target.data('video'),
	    pageUrl = $target.data('link');

	var $closebtn = $('<button id="dhr-videoclose-' + index + '"><i class="icon-cancel" aria-hidden="true"></i><span class="sr-only">Close</span></button>'),
	    $video = null,
	    firstOpen = true,
	    isPlayReady = false,
	    plyrRef = null;

	var dismissBeforeEnd = function dismissBeforeEnd($element, callback) {
		$element.velocity('transition.fadeOut', { duration: 650 });
		_globals.$body.velocity('transition.fadeOut', {
			duration: 700,
			complete: function complete() {
				return callback();
			}
		});
	};

	//Play Button Click -------------------------//
	$t.on('click', function (e) {
		e.preventDefault();
		if ($target.hasClass('velocity-animating')) return;

		$video = $('<video controls src="' + videopath + '"></video>');

		$target.append($video).prepend($closebtn);
		_globals.$body.addClass('is-playingtriggered');

		//home page
		if (isHomePage) {

			var expectedHeight = $targetparent.width() * 0.525,
			    isTaller = expectedHeight >= _globals.$window.height();

			$targetparent.velocity('scroll', {
				offset: !isTaller ? -((_globals.$window.height() - expectedHeight) / 2) : 0,
				duration: 500,
				complete: function complete() {
					return $target.velocity('slideDown', { duration: 650, easing: _globals.easeOutBack });
				}
			});

			var vidplyr = window.plyr.setup($video[0], {
				controls: ['play', 'progress', 'mute', 'volume', 'fullscreen'],
				volume: 7
			}),
			    $plyrEl = $target.find('.plyr--video');

			plyrRef = vidplyr[0];

			plyrRef.on('ready', function (event) {
				isPlayReady = true;
				if (!isPlaying) {
					vidplyr[0].play();
					isPlaying = true;
				}
			});

			plyrRef.on('ended', function (event) {
				//$body.addClass('is-videoended');
				dismissBeforeEnd($plyrEl, function () {
					return window.location.replace(pageUrl);
				});
			});

			$plyrEl.velocity({
				translateY: ['0%', '100%']
			}, {
				duration: 700,
				delay: 1150,
				easing: 'easeOutCirc',
				begin: function begin() {
					if (plyrRef.isReady()) {
						plyrRef.play();
						isPlaying = true;
					}
				},
				complete: function complete() {
					_pageloadSequence.homevideo.pause();
					_globals.$body.addClass('is-playingvideo');
				}
			});

			//single story / features
		} else {}

		firstOpen = false;
	});

	$closebtn.on('click', function () {
		if ($target.hasClass('velocity-animating')) return;
		plyrRef.pause();
		$target.velocity('slideUp', {
			duration: 450,
			easing: 'easeOutCirc',
			complete: function complete() {
				plyrRef.destroy();
				plyrRef = null;
				$target.find('video').remove();
				isPlaying = false;
				_pageloadSequence.homevideo.play();
			}
		});
		_globals.$body.removeClass('is-playingtriggered is-playingvideo');
		_globals.$top.velocity('scroll', { duration: 450 });
	});
}); //end each()

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(9);

__webpack_require__(6);

__webpack_require__(1);

__webpack_require__(7);

__webpack_require__(3);

__webpack_require__(2);

__webpack_require__(10);

__webpack_require__(8);

__webpack_require__(4);

__webpack_require__(5);

var _globals = __webpack_require__(0);

//chromium detect - something breaks w/ 3d rendering in other engines
//polyfills, small jquery plugs, etc... include first


if (window.chrome) {
	_globals.$body.addClass('version-blendmoded is-chromium');
} else {}
//not desktop chrome


// import DesignerOptions from './designer-options.js';
// const dopts = new DesignerOptions({
// 	options: {
// 		'blendmoded': 'Blend Mode On/Off',
// 		'hovertilt': 'Hover Tilt Effect'
// 	},
// 	stylesheet: 'assets/css/designer-options.css'
// });

// wtf
// $.Velocity.Easings.sitedefault = function(p, opts, tweenDelta) {
// 	return [0.175, 0.885, 0.32, 1.275];
// };
//raf

//global functionality

//plugins.min.js is loaded before the webpack bundle
//it is a bundle of jquery & plugins because some don't yet support es6 module

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Breakpoints Class --------------------//

// usage: helper functions to test viewport size @ exact match w/ css
// window.matchMedia alternative
//
// Breakpoints({
// 	breakpoints: ['sm']
// })
//


var defaultBreakpoints = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
    defaultElement = document.querySelector('body'),
    getCurrent = function getCurrent() {
	return window.getComputedStyle(defaultElement, ':before').getPropertyValue('content').replace(/\"/g, '');
};

var currentBpIndex = null,
    initialBp = getCurrent();

var Breakpoints = function () {
	function Breakpoints(options) {
		_classCallCheck(this, Breakpoints);

		options = options || {};
		this.breakpoints = options.breakpoints || defaultBreakpoints;
		this.element = options.element || defaultElement;

		this.refreshCurrentIndex();
		this.initbp = this.getCurrent();

		if (options.evented) {
			//todo: custom event 'breakpoints.xs.down'
		}
	}

	//get value of the pseudo-element


	_createClass(Breakpoints, [{
		key: 'getCurrent',
		value: function getCurrent() {
			return window.getComputedStyle(this.element, ':before').getPropertyValue('content').replace(/\"/g, '');
		}
	}, {
		key: 'emitEvents',
		value: function emitEvents() {
			var newBp = getCurrent(),
			    currBp = this.initBp;

			if (newBp !== currBp) {
				$(window).trigger('breakpoints.change');
				currBp = newBp;
			}
		}
	}, {
		key: 'refreshCurrentIndex',
		value: function refreshCurrentIndex() {
			currentBpIndex = this.breakpoints.indexOf(this.getCurrent());
		}
	}, {
		key: 'breakpointUp',
		value: function breakpointUp(bp) {
			this.refreshCurrentIndex();
			var bpArgIndex = this.breakpoints.indexOf(bp);
			return currentBpIndex >= bpArgIndex;
		}
	}, {
		key: 'breakpointDown',
		value: function breakpointDown(bp) {
			this.refreshCurrentIndex();
			var bpArgIndex = this.breakpoints.indexOf(bp);
			return currentBpIndex <= bpArgIndex;
		}
	}, {
		key: 'breakpointBetween',
		value: function breakpointBetween(min, max) {
			this.refreshCurrentIndex();
			var bpMinIndex = this.breakpoints.indexOf(min),
			    bpMaxIndex = this.breakpoints.indexOf(max);
			return currentBpIndex >= bpMinIndex && currentBpIndex <= bpMaxIndex;
		}
	}]);

	return Breakpoints;
}();

exports.default = Breakpoints;
;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = SplitText;
function SplitText(identifier, vars) {

	function duplicateObject(obj) {
		if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) == "object" && obj !== null) {
			var ret = {};
			for (var index in obj) {
				ret[index] = duplicateObject(obj[index]);
			}
			return ret;
		} else {
			return obj;
		}
	}

	String.prototype.replaceAll = function (search, replacement) {
		var target = this;
		return target.split(search).join(replacement);
	};

	function hasClass(obj, c) {
		return new RegExp('(\\s|^)' + c + '(\\s|$)').test(obj.className);
	}

	function addClass(obj, c) {
		if (!hasClass(obj, c)) {
			obj.className += ' ' + c;
		}
	}

	function removeClass(obj, c) {
		if (hasClass(obj, c)) {
			obj.className = obj.className.replace(new RegExp('(\\s|^)' + c + '(\\s|$)'), ' ').replace(/\s+/g, ' ').replace(/^\s|\s$/, '');
		}
	}

	function findPos(node) {
		var node = node;
		var curtop = 0;
		var curtopscroll = 0;
		var curleft = 0;
		var curleftscroll = 0;
		//var needHTML = true;
		if (node.offsetParent) {
			do {
				if (node.offsetParent && node.offsetParent == document.getElementsByTagName("html")[0]) {
					// needHTML = false;
				}
				curtop += node.offsetTop;
				curtopscroll += node.offsetParent ? node.offsetParent.scrollTop : 0;
				curleft += node.offsetLeft;
				curleftscroll += node.offsetParent ? node.offsetParent.scrollLeft : 0;
			} while (node = node.offsetParent);

			// if(needHTML){
			// 	curtopscroll += document.getElementsByTagName("html")[0].scrollTop;
			// 	curleftscroll += document.getElementsByTagName("html")[0].scrollLeft;
			// }


			return [curleft - curleftscroll, curtop - curtopscroll];
		}
	}

	var identifier = identifier || [];
	var defaults = {
		type: "chars,words,lines",
		charsClass: undefined,
		linesClass: undefined,
		wordsClass: undefined,
		position: "relative"
	};

	this.HTMLobjects = [];
	this.vars = {};
	this.originalHTML = [];

	this.lines = [];
	this.words = [];
	this.chars = [];

	//if the identifier isn't an array, make it one.  If it already is, don't worry.  :)
	if (!Array.isArray(identifier)) {
		identifier = [identifier];
	}

	//itterate through the array
	for (var i = 0; i < identifier.length; i++) {

		//if it is an html element, simply add it
		if (identifier[i].nodeType == 1) {
			this.HTMLobjects.push(identifier[i]);
		}

		//if jquery Element add each html Element
		if (window.jQuery && identifier[i] && (identifier[i] instanceof jQuery || identifier[i].constructor.prototype.jquery)) {
			//itterate through array of html elements inside jquery object
			for (var j = 0; j < identifier[i].length; j++) {
				//Check that it is an html element before appending it
				if (identifier[i][j].nodeType == 1) {
					this.HTMLobjects.push(identifier[i][j]);
				}
			}
		}

		//if it's a string, try query selector all
		if (typeof identifier[i] == "string") {
			elements = document.querySelectorAll(identifier[i]);
			for (var j = 0; j < elements.length; j++) {
				if (elements[j].nodeType == 1) {
					this.HTMLobjects.push(elements[j]);
				}
			}
		}
	}

	//if there is an object of variables replace defaults otherwise use defaults
	if (vars && (typeof vars === 'undefined' ? 'undefined' : _typeof(vars)) == "object" && vars !== null) {

		//if type is passed and it's a string, try and validate otherwise use default
		if (vars.type && typeof vars.type == "string") {
			vars.type = vars.type.split(",");
			var possible = ["chars", "words", "lines"];
			var use = [];
			for (var i = 0; i < vars.type.length; i++) {
				if (possible.indexOf(vars.type[i].toLowerCase()) != -1 && use.indexOf(vars.type[i].toLowerCase()) == -1) {
					use.push(vars.type[i].toLowerCase());
				} else {
					console.error(vars.type[i] + "is not a valid type");
				}
			}

			if (use.length == 0) {
				this.vars.type = defaults.type;
			} else {
				this.vars.type = use.join(",");
			}
		} else {
			this.vars.type = defaults.type;
		}

		//if charsClass is set then use it
		this.vars.charsClass = vars.charsClass && typeof vars.charsClass == "string" ? vars.charsClass : defaults.charsClass;

		//if wordsClass is set then use it
		this.vars.wordsClass = vars.wordsClass && typeof vars.wordsClass == "string" ? vars.wordsClass : defaults.wordsClass;

		//if linesClass is set then use it
		this.vars.linesClass = vars.linesClass && typeof vars.linesClass == "string" ? vars.linesClass : defaults.linesClass;

		//greensock's splittext doesn't allow static or null.  null will not set position and leave it to any css on the page
		var allowedPositions = ["absolute", "relative", "static", "fixed", "inherit", "initial", null];
		this.vars.position = vars.position && allowedPositions.indexOf(vars.position) != -1 ? vars.position : defaults.position;
	} else {
		this.vars = duplicateObject(defaults);
	}

	//Store the original state so we can revert easily
	for (var i = 0; i < this.HTMLobjects.length; i++) {
		this.originalHTML[i] = this.HTMLobjects[i].innerHTML;
	}

	//add the revert function
	this.revert = function () {
		for (var i = 0; i < this.HTMLobjects.length; i++) {
			this.HTMLobjects[i].innerHTML = this.originalHTML[i];
		}
	};

	//
	//By now we should have an array at this.HTMLobjects of html objects that need spliting.
	//	

	//regex match spaces and non space characters
	//can't use this for 
	var regex = {
		wordbreak: / /gm,
		charbreak: /[^\s]/gm
	};

	this.vars.type = this.vars.type.split(",");

	for (var i = 0; i < this.HTMLobjects.length; i++) {

		var current = this.HTMLobjects[i];

		//remove tags from element
		//ideally, this won't be needed in the future
		current.innerHTML = current.innerHTML.replace(/<\/?[^>]+(>|$)/g, "");

		var currentLists = {
			lines: [],
			words: [],
			chars: []
		};

		//Split Lines
		if (this.vars.type.indexOf("lines") != -1) {
			var text = current.innerHTML;
			var words = text.split(' ');
			var splitPoints = [];
			current.innerHTML = words[0];
			var height = current.offsetHeight;

			//work out where the splits are
			for (var j = 1; j < words.length; j++) {
				current.innerHTML = current.innerHTML + ' ' + words[j];
				if (current.offsetHeight > height) {
					height = current.offsetHeight;
					splitPoints.push(current.innerHTML.length - (words[j].length + 1));
				}
			}
			//add the last line
			splitPoints.push(current.innerHTML.length);

			//add the text to the element, adding in the tags

			current.innerHTML = "";

			for (var j = 0; j < splitPoints.length; j++) {
				var lineStart = j == 0 ? 0 : splitPoints[j - 1] + 1;
				var lineEnd = j == splitPoints.length - 1 ? text.length : splitPoints[j];

				var div = document.createElement("div");

				div.style.display = "block";
				if (this.vars.linesClass !== undefined && this.vars.linesClass != "undefined") {
					this.class = this.vars.linesClass.replace("++", j + 1);
				}
				div.innerHTML = text.substring(lineStart, lineEnd);
				current.appendChild(div);

				if (this.vars.position !== null) {
					if (this.vars.position == "absolute") {
						div.toBe = {
							top: div.offsetTop,
							left: div.offsetLeft
						};
						div.style.position = "relative";
					} else if (this.vars.position == "fixed") {
						var pos = findPos(div);
						div.toBe = {
							top: pos[1],
							left: pos[0]
						};
						div.style.position = "relative";
					} else {
						div.style.position = this.vars.position;
					}
				}

				currentLists.lines.push(div);
			}
		}

		//split the words
		if (this.vars.type.indexOf("words") != -1) {
			var splitWords = function splitWords(parent, st) {
				var startTag = "<div style='display:inline-block;'>";
				var endTag = "</div>";
				parent.innerHTML = startTag + parent.innerHTML.replaceAll(" ", endTag + " " + startTag) + endTag;

				var nodes = parent.querySelectorAll("div");

				for (var j = 0; j < nodes.length; j++) {
					if (st.vars.wordsClass !== undefined && st.vars.wordsClass != "undefined") {
						addClass(nodes[j], st.vars.wordsClass.replaceAll("++", j + 1));
					}

					if (st.vars.position !== null) {
						if (st.vars.position == "absolute") {
							nodes[j].toBe = {
								top: nodes[j].offsetTop,
								left: nodes[j].offsetLeft
							};
							nodes[j].style.position = "relative";
						} else if (st.vars.position == "fixed") {
							var pos = findPos(nodes[j]);
							nodes[j].toBe = {
								top: pos[1],
								left: pos[0]
							};
							nodes[j].style.position = "relative";
						} else {
							nodes[j].style.position = st.vars.position;
						}
					}

					currentLists.words.push(nodes[j]);
				}
			};

			//if it has been split by lines, split each line by words


			if (this.vars.type.indexOf("lines") != -1) {
				for (var j = 0; j < currentLists.lines.length; j++) {
					splitWords(currentLists.lines[j], this);
				}
			} else {
				splitWords(current, this);
			}
		}

		//split the characters
		if (this.vars.type.indexOf("chars") != -1) {
			var splitChars = function splitChars(parent, st) {
				var startTag = "<div style='display:inline-block;'>";
				var endTag = "</div>";
				var specials = parent.innerHTML.match(/(&\w+;)/g);
				parent.innerHTML = startTag + parent.innerHTML.replace(/&\w+;/g, "ህ").split("").join(endTag + startTag) + endTag;

				var nodes = parent.querySelectorAll("div");

				for (var j = 0; j < nodes.length; j++) {
					if (st.vars.charsClass !== undefined && st.vars.charsClass != "undefined") {
						var newClass = st.vars.charsClass.replaceAll("++", j + 1);
						if (j != nodes.length - 1) {
							newClass = newClass.replaceAll("**", nodes[j].innerHTML + nodes[j + 1].innerHTML);
						} else {
							newClass = newClass.replaceAll("**", "");
						}
						addClass(nodes[j], newClass);
					}

					if (st.vars.position !== null) {
						if (st.vars.position == "absolute") {
							nodes[j].toBe = {
								top: nodes[j].offsetTop,
								left: nodes[j].offsetLeft
							};
							nodes[j].style.position = "relative";
						} else if (st.vars.position == "fixed") {
							var pos = findPos(nodes[j]);
							nodes[j].toBe = {
								top: pos[1],
								left: pos[0]
							};
							nodes[j].style.position = "relative";
						} else {
							nodes[j].style.position = st.vars.position;
						}
					}

					if (nodes[j].innerHTML == "ህ") {
						nodes[j].innerHTML = specials[0];
						specials.splice(0, 1);
					}

					currentLists.chars.push(nodes[j]);
				}
			};

			//if it has been split by words, split each word by characters
			//if it has only be split by lines, split each line by characters


			if (this.vars.type.indexOf("words") != -1) {
				for (var j = 0; j < currentLists.words.length; j++) {
					splitChars(currentLists.words[j], this);
				}
			} else if (this.vars.type.indexOf("lines") != -1) {
				for (var j = 0; j < currentLists.lines.length; j++) {
					splitChars(currentLists.lines[j], this);
				}
			} else {
				splitChars(current, this);
			}
		}

		if (this.vars.position == "absolute" || this.vars.position == "fixed") {
			for (var j = currentLists.chars.length - 1; j >= 0; j--) {
				currentLists.chars[j].style.width = currentLists.chars[j].offsetWidth + "px";
				currentLists.chars[j].style.height = currentLists.chars[j].offsetHeight + "px";
				currentLists.chars[j].style.left = currentLists.chars[j].toBe.left + "px";
				currentLists.chars[j].style.top = currentLists.chars[j].toBe.top + "px";
			}

			for (var j = currentLists.words.length - 1; j >= 0; j--) {
				currentLists.words[j].style.width = currentLists.words[j].offsetWidth + "px";
				currentLists.words[j].style.height = currentLists.words[j].offsetHeight + "px";
				currentLists.words[j].style.left = currentLists.words[j].toBe.left + "px";
				currentLists.words[j].style.top = currentLists.words[j].toBe.top + "px";
			}

			for (var j = currentLists.lines.length - 1; j >= 0; j--) {
				currentLists.lines[j].style.width = currentLists.lines[j].offsetWidth + "px";
				currentLists.lines[j].style.height = currentLists.lines[j].offsetHeight + "px";
				currentLists.lines[j].style.left = currentLists.lines[j].toBe.left + "px";
				currentLists.lines[j].style.top = currentLists.lines[j].toBe.top + "px";
			}

			for (var j = currentLists.chars.length - 1; j >= 0; j--) {
				currentLists.chars[j].style.position = this.vars.position;
			}

			for (var j = currentLists.words.length - 1; j >= 0; j--) {
				currentLists.words[j].style.position = this.vars.position;
			}

			for (var j = currentLists.lines.length - 1; j >= 0; j--) {
				currentLists.lines[j].style.position = this.vars.position;
			}
		}

		this.lines = this.lines.concat(currentLists.lines);
		this.words = this.words.concat(currentLists.words);
		this.chars = this.chars.concat(currentLists.chars);
	}
}

/***/ })
/******/ ]);