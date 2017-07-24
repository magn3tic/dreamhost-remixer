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
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
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
    isDev = exports.isDev = window.location.hostname === 'localhost',
    easeOutBack = exports.easeOutBack = [0.0755, 0.985, 0.325, 1.07];

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.$emailInput = exports.pushToDrip = undefined;

var _globals = __webpack_require__(0);

var lastSubscriber = false;
var isSubmitting = false;

var pushToDrip = exports.pushToDrip = function pushToDrip(obj) {
	if (window._dcq && window._dcs) {
		obj.tags = ['remixer_microsite'];
		window._dcq.push(['identify', obj]);
	} else {
		console.error('The getdrip.com js snippet is not installed!');
	}
};

var dripSuccessCallback = function dripSuccessCallback(event) {
	if (_globals.isDev) {
		console.log(event);
	}
	if (event && event.success) {
		$footerForm.removeClass('is-submitting is-submitted-invalid is-submitted-error').addClass('is-submitted-success');
		$submitBtn.removeAttr('disabled');

		lastSubscriber = event.email;

		$(document).one('click', function () {
			$footerForm.removeClass('is-submitted-success');
			$emailInput.val('').parent('.is-filledin').removeClass('is-filledin');
		});
	} else {
		dripFailureCallback.call();
	}
	isSubmitting = false;
};

var dripFailureCallback = function dripFailureCallback(event) {
	$footerForm.removeClass('is-submitted-invalid').addClass('is-submitted-error');
	$emailInput.focus();
	isSubmitting = false;
};

var $footerForm = $('#dhr-footer-form');
var $submitBtn = $('#dhr-footer-submit');
var $emailInput = exports.$emailInput = $('#dhr-footer-emailinput');
var $emailParent = $emailInput.parent('.dhr-formfield');

//form submit handler
var onEmailFormSubmit = function onEmailFormSubmit() {
	var emailVal = $emailInput.val();

	if (emailVal.length > 3 && emailVal.indexOf('@') > 0) {

		pushToDrip({
			email: emailVal,
			success: dripSuccessCallback,
			failure: dripFailureCallback
		});
	} else {

		$footerForm.addClass('is-submitted-invalid');
		$emailInput.focus();

		$footerForm.removeClass('is-submitting');
		$submitBtn.removeAttr('disabled');
		isSubmitting = false;
	}
};

$emailInput.on('keyup blur', function () {
	if ($(this).val().length > 0) {
		$emailParent.addClass('is-filledin');
	} else {
		$emailParent.removeClass('is-filledin');
	}
});

$submitBtn.on('mousedown touchstart', function () {
	$footerForm.trigger('submit');
});

$footerForm.submit(function (e) {
	e.preventDefault();

	if (isSubmitting) return;

	isSubmitting = true;

	$footerForm.addClass('is-submitting').removeClass('is-submitted-invalid is-submitted-error');
	$submitBtn.attr('disabled', true);

	window.setTimeout(function () {
		return onEmailFormSubmit();
	}, 0);
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.$modalstaggeritems = undefined;

var _globals = __webpack_require__(0);

// Contact Modal
var $modaltrigger = $('a[href="#contact"]'),
    $modalclose = $('#dhr-modalclose'),
    $modal = $('#dhr-contactmodal'),
    $modalbody = $('.dhr-contactmodal--body'),
    $modalbodyLiner = $('.dhr-contactmodal--body-liner'),
    $modalbodyInner = $modalbody.find('.inner'),
    $modaltop = $('.dhr-contactmodal--top'),
    $maincontent = $('#dhr-main'),
    $fixedhero = $('.dhr-fixedhero'),
    $firstname = $('#dhr-contact-firstname-input'),
    $movecontents = $maincontent.add($fixedhero).add(_globals.$sitefooter);

var $modalstaggeritems = exports.$modalstaggeritems = $('.dhr-contactmodal--intro, .dhr-contactmodal--form, .dhr-contactmodal--btns');

var isOpen = false;
var isTaller = false;
var modaltopHeight = $modaltop.outerHeight();

//opening
$modaltrigger.on('click', function (e) {
	e.preventDefault();
	if ($modal.hasClass('velocity-animating')) return;

	$modal.velocity({
		translateY: ['0%', '-100%']
	}, {
		duration: 600,
		visibility: 'visible',
		easing: _globals.easeOutBack
	});

	modaltopHeight = $modaltop.outerHeight();
	isTaller = $modalbodyInner.outerHeight() + modaltopHeight > _globals.$window.height();

	$modalbody.css({
		height: _globals.$window.height() - modaltopHeight - 5
		//minHeight: $modalbodyInner.outerHeight()
	});

	if (isTaller) {
		$modalbody.addClass('is-taller');
	}

	$modalstaggeritems.velocity('transition.slideDownIn', {
		stagger: 150,
		drag: true,
		duration: 900,
		complete: function complete() {
			_globals.$body.addClass('is-ready-contactmodal');
		}
	});

	$movecontents.velocity({
		translateY: _globals.$window.height()
	}, {
		easing: _globals.easeOutBack,
		duration: 600,
		complete: function complete() {
			return $firstname.focus();
		}
	});

	_globals.$body.addClass('is-showing-contactmodal');
	isOpen = true;
});

//closing
$modalclose.on('click', function () {
	$modal.velocity({
		translateY: ['-100%', '0%']
	}, {
		duration: 350,
		visibility: 'hidden',
		easing: 'easeOutCirc',
		complete: function complete() {
			_globals.$body.removeClass('is-showing-contactmodal is-ready-contactmodal');
			$modalstaggeritems.css({ opacity: 0 });
			$(document).trigger('dhr.contactmodal.closed');
			isOpen = false;
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
	modaltopHeight = $modaltop.outerHeight();
	isTaller = $modalbodyInner.outerHeight() + modaltopHeight > _globals.$window.height();

	if (isTaller) {
		$modalbody.addClass('is-taller');
	} else {
		$modalbody.removeClass('is-taller');
	}
	$modalbody.css({ height: _globals.$window.height() - $modaltop.outerHeight() });
});

if (window.location.hash === '#contact') {
	$modaltrigger.trigger('click');
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.homevideo = undefined;

var _globals = __webpack_require__(0);

var _scrollTicker = __webpack_require__(4);

//import SplitText from './splittext.js';
var $top = $('#top'),
    $loadscreen = $('#dhr-loadscreen'),
    $homevideo = $('#dhr-home-videoel');

var homevideo = exports.homevideo = $homevideo.length === 1 ? $homevideo[0] : false;

var pageOutDuration = 500,
    isHomePage = _globals.$body.hasClass('dhr-currentpage-index');

//animation prep stuff / on domready
// const $spltels = $('.dhr-preheadline, .dhr-sectionheadline, .dhr-mainheadline'),
// 			splttxt = new SplitText($spltels, {type:'lines'});

// const unwrapSplitText = (elements) => {
// 	elements.forEach((item, i) => $(item).unwrap());
// };

// splttxt.lines.forEach((item, i) => {
// 	$(item).wrap('<div class="dhr-splttxt-line"></div>').css({opacity:0});
// });


//internal links - on navigate away
var $transitionlinks = $('a[data-page-transition]');

$transitionlinks.click(function (event) {

	//disabling for now - need to keep browser history intact
	return;

	if (!window.Modernizr.history || !window.Modernizr.localstorage) return;

	event.preventDefault();
	var href = $(this).attr('href');

	if (href.indexOf('#') === 0) return;

	$top.velocity('scroll', { duration: pageOutDuration });
	_globals.$body.addClass('is-pagetransitioning').velocity('transition.fadeOut', { duration: pageOutDuration });

	//window.history.pushState({}, '', href);

	setTimeout(function () {
		window.location.replace(href);
	}, pageOutDuration);
});

// $window.on('popstate', (e) => {
// 	e.preventDefault();
// 	if (window.Modernizr.history) {
// 		window.history.back();
// 	}
// });


//on page fully loaded
var onFullPageload = function onFullPageload() {

	_globals.$body.addClass('is-fullyloaded');

	$top.velocity('scroll', { duration: 50 });

	// splttxt.lines.forEach((item, index) => {
	// 	$(item).velocity({
	// 		translateY:['0px', '50px'], 
	// 		opacity:[1, 0]
	// 	}, {
	// 		easing:'easeOutQaurt', 
	// 		duration:500, 
	// 		delay:100*index,
	// 		complete: () => {
	// 			if (index === splttxt.lines.length-1) {
	// 				unwrapSplitText(splttxt.lines);
	// 				splttxt.revert();
	// 			}
	// 		}
	// 	});
	// });


	$loadscreen.velocity('transition.fadeOut', { duration: 250, delay: 20, complete: function complete() {
			_scrollTicker.inViewTicker.call();
			_scrollTicker.ticker.call();
		} });

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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.ticker = exports.didScroll = exports.headerInView = exports.scrollDiff = exports.scrollCurrent = exports.scrollBefore = exports.docheight = exports.winheight = exports.headertop = exports.headerheight = exports.inViewTicker = undefined;

var _globals = __webpack_require__(0);

var _breakpoints = __webpack_require__(13);

var _breakpoints2 = _interopRequireDefault(_breakpoints);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bps = new _breakpoints2.default();

//inview class toggling
var $inviewels = $('[data-inview]');

var inViewTicker = exports.inViewTicker = function inViewTicker() {
	$inviewels.each(function () {
		var $t = $(this);
		if ($t.inView(true)) {
			$t.addClass('is-inview');
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
	if (!_globals.$siteheader.length) return;
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

var ticker = exports.ticker = function ticker() {
	if (didScroll) {
		scrollUpdate();

		inViewTicker();

		if (!_globals.$siteheader.length) return;

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

_globals.$window.on('resize', $.debounce(300, false, scrollUpdate));
_globals.$window.scroll(function () {
	return exports.didScroll = didScroll = true;
});

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _globals = __webpack_require__(0);

var _emailSubscribe = __webpack_require__(1);

var $allepisodes = $('.dhr-episodeitem'),
    cdSec = 1000,
    cdMin = cdSec * 60,
    cdHr = cdMin * 60,
    cdDay = cdHr * 24;

var currentdate = new Date(),
    currentepoch = currentdate.getTime(),
    $lockedepisodes = null;

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
	return result;
};

//go through once to determine which items need countdowns
$allepisodes.each(function () {
	var $t = $(this),
	    $countdown = $t.find('[data-countdown]'),
	    unlockepoch = new Date($countdown.data('countdown')).getTime();

	if (unlockepoch - currentepoch > 0) {
		$t.addClass('dhr-episodeitem--locked');
	} else {
		$countdown.remove();
	}
});

//go through each locked episode
$lockedepisodes = $('.dhr-episodeitem--locked');
$lockedepisodes.each(function (index, item) {

	var $this = $(item),
	    $countdown = $this.find('[data-countdown]'),
	    unlockepoch = new Date($countdown.data('countdown')).getTime(),
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

	if (timeDiff >= 0) {

		window.setTimeout(function () {
			return doHtmlUpdate($html, until);
		}, 150 * index);

		$(document).on('clocktick', function () {
			timeDiff = unlockepoch - currentepoch;
			until.days = digitPrefixer(Math.floor(timeDiff / cdDay));
			until.hours = digitPrefixer(Math.floor(timeDiff % cdDay / cdHr));
			until.mins = digitPrefixer(Math.floor(timeDiff % cdHr / cdMin));
			until.sec = digitPrefixer(Math.floor(timeDiff % cdMin / cdSec));

			if (timeDiff >= 0) {
				window.setTimeout(function () {
					return doHtmlUpdate($html, until);
				}, 150 * index);
			} else {
				$countdown.remove();
			}
		});

		$this.addClass('is-countdownstarted').children('a[class*="--link"]').click(function (e) {
			e.preventDefault();
			_globals.$sitefooter.velocity('scroll', { duration: 550, easing: 'easeOutCirc', complete: function complete() {
					_emailSubscribe.$emailInput.focus();
				} });
		});
	} else {

		$this.removeClass('dhr-episodeitem--locked');
		$countdown.remove();
	}
});

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _globals = __webpack_require__(0);

var _emailSubscribe = __webpack_require__(1);

var _contactModal = __webpack_require__(2);

var $form = $('#dhr-contact-form');
var $fields = $form.find('[name^="fields["]');
var $emailInput = $('#dhr-contact-email-input');
var $submitBtn = $form.find('[type="submit"]');
var $finalSuccessMsg = $('.dhr-contactmodal--success');
var $finalSuccessClose = $('#secondary-modal-close');
var $modalContentsLiner = $('.dhr-contactmodal--body-liner > .inner');

var hasBeenSubmitted = false;

//general validation
var validationCheck = function validationCheck() {
	var filled = [];
	var emailVal = $emailInput.val();

	$fields.each(function (index) {
		var $t = $(this);
		var $parent = $t.parent('.dhr-inlineform--input');
		if ($t.val().length) {
			filled.push(index);
			$parent.removeClass('is-fieldinvalid');
		} else {
			$parent.addClass('is-fieldinvalid');
		}
	});
	return filled.length === $fields.length && emailVal.indexOf('@') > 0;
};
var filledInCheck = function filledInCheck($field, $outer) {
	if ($field.val().length > 0) {
		$outer.removeClass('is-fieldinvalid').addClass('is-filledin');
	} else {
		$outer.removeClass('is-filledin');
	}
};

//form final success
var formSuccessFinal = function formSuccessFinal() {
	$modalContentsLiner.css({ height: $modalContentsLiner.outerHeight() });
	_contactModal.$modalstaggeritems.velocity('transition.slideUpOut', { stagger: 100, drag: true, duration: 550 });
	$finalSuccessMsg.velocity('transition.slideUpIn', { duration: 600, delay: 500, display: 'flex' });
};

//drip failure callback
var dripOnFail = function dripOnFail(e) {
	$form.removeClass('is-submitting').addClass('is-formerror');
	$submitBtn.removeAttr('disabled');
};

//obj to send to drip
var dripData = {
	success: function success(event) {
		if (_globals.isDev) console.log(event);
		if (event && event.success) {
			$submitBtn.removeAttr('disabled');
			$form.removeClass('is-submitting');
			hasBeenSubmitted = true;

			formSuccessFinal();
		} else {
			dripOnFail.call(event);
		}
	},
	failure: dripOnFail
};

var onFormSubmit = function onFormSubmit(dripObject) {
	if (validationCheck()) {
		if (_globals.isDev) console.log(dripObject);

		//testing failure / success msg
		//dripOnFail();
		$form.removeClass('is-submitting');
		hasBeenSubmitted = true;
		formSuccessFinal();
		return;

		(0, _emailSubscribe.pushToDrip)(dripObject);
	} else {

		$submitBtn.removeAttr('disabled');
		$form.removeClass('is-submitting').addClass('is-forminvalid');
		$form.find('.is-fieldinvalid [name^="fields"]').first().trigger('focus');
	}
};

$fields.each(function () {
	var $t = $(this),
	    $outer = $t.parent('.dhr-inlineform--input'),
	    isSelect = $outer.data('field-type') === 'select';

	var name = $t.attr('name');
	name = name.replace('fields[', '');
	name = name.replace(']', '');
	dripData[name] = null;

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

$form.on('submit', function (event) {
	event.preventDefault();
	$form.removeClass('is-forminvalid is-formerror').addClass('is-submitting').find('.is-fieldinvalid').removeClass('is-fieldinvalid');
	$submitBtn.attr('disabled', true);

	for (var prop in dripData) {
		if (prop !== 'success' && prop !== 'failure') {
			var $field = $form.find('[name="fields[' + prop + ']"]');
			dripData[prop] = $field.val();
		}
	}
	setTimeout(function () {
		return onFormSubmit(dripData);
	}, 500);
});

//hack to allow user to navigate to drip's hosted form (must POST not GET)
$('.dhr-contactmodal--error').find('a').on('click', function (e) {
	e.preventDefault();
	var $hiddenform = $('#dhr-hidden-post-form');
	for (var prop in dripData) {
		if (prop && prop !== 'failure' && prop !== 'success') {
			console.log(prop);
			$hiddenform.find('input[name="fields[' + prop + ']"]').val(dripData[prop]);
		}
	}
	$hiddenform.trigger('submit');
});

//when contact modal is closed
$(document).on('dhr.contactmodal.closed', function () {
	if (hasBeenSubmitted) {
		if (_globals.isDev) {
			console.log('contact is closed');
		}

		$fields.val('');
		$('.dhr-inlineform--input.is-filledin').removeClass('is-filledin');
		$modalContentsLiner.removeAttr('style');
		$finalSuccessMsg.removeAttr('style');
	}
});

$finalSuccessClose.on('click', function (e) {
	e.preventDefault();
	$('#dhr-modalclose').trigger('click');
});

/***/ }),
/* 7 */
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

	_globals.$window.on('load', function () {
		return flkty.reloadCells();
	});
}

//next episode blocks
var $nextEpBlock = $('.dhr-nextepisode');
var $nextEpAnchor = $('.dhr-nextepisode > a');

$nextEpAnchor.on('click', function (event) {
	event.preventDefault();
	if ($nextEpBlock.hasClass('is-comingsoon')) {
		_globals.$sitefooter.velocity('scroll', { duration: 400, easing: 'easeOutQuart', offset: 100, complete: function complete() {
				_globals.$sitefooter.find('input[type="email"]').focus();
			} });
	}
});

//features page video play btn
var $featuresVideoBtn = $('#dhr-features-vidbtn');
$featuresVideoBtn.on('click', function () {
	return $('.dhr-videocard--link').trigger('click');
});

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
	$($(this).attr('href')).velocity('scroll', { duration: 900, easing: 'easeOutQuart' });
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
/* 8 */
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

$(document).ready(function () {

	$hovercards.each(function () {
		if (Modernizr.touchevents) return;

		var $t = $(this),
		    $parent = $t.parent(),
		    isEpisode = $parent.hasClass('dhr-episodeitem'),
		    scaleVal = $t.data('hovercard-scale') || '',
		    tiltVal = $t.data('hovercard-tilt') || 7;

		//don't tilt locked episode items
		if ($parent.hasClass('dhr-episodeitem--locked')) return;

		//this 3d tilt thing only really look smooth in chrome
		//temp fix until we can experiment and see wtf is going on
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
				$t.css({ transform: getTransformValue.call($t, '0.98', tiltVal) });
			}
		});

		$t.mouseleave(function () {
			return $t.attr('style', '');
		});
	});
});

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $socialLinks = $('[data-social-links]');
var $socialAnchors = $socialLinks.find('a:not([href^="mailto:"])');
var $mailtoAnchors = $socialLinks.find('a[href^="mailto"]');

$mailtoAnchors.each(function () {
  var $t = $(this);
  $t.attr('href', $t.attr('href').replace('%%url%%', window.location.href));
});

$socialAnchors.on('click', function (e) {
  e.preventDefault();

  var $t = $(this);
  var shareUrl = $t.attr('href').replace('%%url%%', window.location.href);

  $.centeredPopup({
    url: shareUrl,
    width: 400,
    height: 400
  });
});

/***/ }),
/* 10 */
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

//centered browser popup
window.$.centeredPopup = function (options) {
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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _globals = __webpack_require__(0);

var _pageloadSequence = __webpack_require__(3);

var $homeherotop = $('#dhr-hero-top'),
    $homeherobot = $('#dhr-hero-bottom'),
    $episodelist = $('#dhr-episode-list'),
    $playbtns = $('a[data-video]'),
    isHomePage = _globals.$body.hasClass('dhr-currentpage-index');

var dismissBeforeEnd = function dismissBeforeEnd($element, callback) {
	$element.velocity('transition.fadeOut', { duration: 650 });
	_globals.$body.velocity('transition.fadeOut', {
		duration: 700,
		complete: function complete() {
			return callback();
		}
	});
};

var isPlaying = false;

$playbtns.each(function (index) {

	var $t = $(this),
	    $target = $($t.data('video-target')),
	    $targetparent = $target.parent('.dhr-fluidvideo'),
	    videopath = $target.data('video'),
	    pageUrl = $target.data('link');

	var $closebtn = $('<button id="dhr-videoclose-' + index + '"><i class="icon-cancel" aria-hidden="true"></i><span class="sr-only">Close</span></button>'),
	    $overlayBg = null,
	    $overlayContent = null,
	    $videoParent = null,
	    $video = null,
	    firstOpen = true,
	    isPlayReady = false,
	    plyrRef = null;

	$target.on('click', function (event) {
		return event.stopPropagation();
	});

	//Play Button Click -------------------------//
	$t.on('click', function (e) {
		e.preventDefault();
		if ($target.hasClass('velocity-animating')) return;

		var videoHtml = '<video>\n\t\t\t<source src="' + videopath + '.webm" type="video/webm">\n\t\t\t<source src="' + videopath + '.mp4" type="video/mp4">\n\t\t\t<source src="' + videopath + '.ogv" type="video/ogg">\n\t\t</video>';

		_globals.$body.removeClass('is-videoended').addClass('is-playingtriggered');
		$video = $(videoHtml);
		$target.append($video).prepend($closebtn);

		//plyr opts/events setup
		var vidplyr = window.plyr.setup($video[0], {
			controls: ['play', 'progress', 'mute', 'volume', 'fullscreen'],
			volume: 8
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
			_globals.$body.addClass('is-videoended');
			if (isHomePage) {
				dismissBeforeEnd($plyrEl, function () {
					return window.location.replace(pageUrl);
				});
			} else {
				$closebtn.trigger('click');
			}
		});

		//measure to determine video height relative to window
		var expectedHeight = $targetparent.width() * 0.565,
		    heightThreshold = _globals.$window.height() - 80,
		    isTaller = expectedHeight >= heightThreshold;

		//home page
		if (isHomePage) {

			$targetparent.velocity('scroll', {
				offset: !isTaller ? -((_globals.$window.height() - expectedHeight) / 2) : 0,
				duration: 500,
				complete: function complete() {
					return $target.velocity('slideDown', { duration: 1000, easing: 'easeOutQuart' });
				}
			});

			$plyrEl.velocity({
				translateY: ['0%']
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
		} else {

			$overlayBg = $('<div class="dhr-playeroverlay" style="display:none;"></div>');
			$overlayContent = $('<div class="dhr-playeroverlay--content"></div>');

			_globals.$body.append($overlayBg);
			$overlayBg.velocity('transition.fadeIn', { duration: 350 });

			_globals.$body.append($overlayContent);
			$targetparent.addClass('is-singlepage-player').detach().appendTo($overlayContent);

			$target.velocity('transition.slideUpBigIn', { duration: 700, delay: 90, complete: function complete() {
					_globals.$body.addClass('is-playingvideo');
					isPlaying = true;
				} });
		}

		//handle cases where video is taller than window
		if (isTaller) {
			var heightDiff = expectedHeight - heightThreshold;
			var sizeUpdate = 100 - Math.round(heightDiff / $targetparent.width() * 100);

			console.log('Height Diff:', heightDiff);
			console.log(sizeUpdate);

			if (isHomePage) {
				$targetparent.css({ width: sizeUpdate + '%', marginLeft: 'auto', marginRight: 'auto' });
			} else {
				$target.css({ width: sizeUpdate + '%', marginLeft: 'auto', marginRight: 'auto' });
			}

			_globals.$body.addClass('is-tallervideo');
		}

		firstOpen = false;
	});

	$closebtn.on('click', function () {
		if ($target.hasClass('velocity-animating')) return;
		if ($overlayBg && $overlayBg.hasClass('velocity-animating')) return;
		if (!isPlaying) return;

		plyrRef.pause();

		//home player
		if (isHomePage) {
			$target.velocity('slideUp', {
				duration: 750,
				easing: 'easeOutCirc',
				complete: function complete() {
					plyrRef.destroy();
					plyrRef = null;
					$target.find('video').remove();
					isPlaying = false;
					_pageloadSequence.homevideo.play();
				}
			});

			_globals.$top.velocity('scroll', { duration: 450, delay: 300 });

			$targetparent.removeAttr('style');

			//other pages
		} else {

			var $modals = $overlayBg.add($overlayContent);

			$target.velocity('transition.slideDownBigOut', { duration: 120, complete: function complete() {
					plyrRef.destroy();
					plyrRef = null;
					$target.find('video').remove();
					isPlaying = false;
				} });

			$modals.velocity('transition.fadeOut', { duration: 220, complete: function complete() {
					$modals.detach();
				} });

			$target.removeAttr('style');
		}

		_globals.$body.removeClass('is-playingtriggered is-playingvideo is-tallervideo');
	});
}); //end each()


$(document).on('click', function () {
	if (!isPlaying) return;
	$('button[id^="dhr-videoclose-"]').trigger('click');
});

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(10);

__webpack_require__(7);

__webpack_require__(3);

__webpack_require__(8);

__webpack_require__(5);

__webpack_require__(2);

__webpack_require__(11);

__webpack_require__(4);

__webpack_require__(1);

__webpack_require__(6);

__webpack_require__(9);

var _globals = __webpack_require__(0);

//chromium detect - something breaks w/ 3d rendering in other engines
//raf

//global functionality

//plugins.min.js is loaded before the webpack bundle
//it is a bundle of jquery & plugins because some don't yet support es6 module


if (window.chrome) {
	_globals.$body.addClass('is-chromium');
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

// console.log(dopts);


// wtf
// $.Velocity.Easings.sitedefault = function(p, opts, tweenDelta) {
// 	return [0.175, 0.885, 0.32, 1.275];
// };
//polyfills, small jquery plugs, etc... include first

/***/ }),
/* 13 */
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

/***/ })
/******/ ]);