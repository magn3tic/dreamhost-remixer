
import {$body, $sitefooter, $siteheader, $window, easeOutBack} from './globals.js';

// Contact Modal
const $modaltrigger = $('a[href="#contact"]'),
			$modalclose = $('#dhr-modalclose'),
			$modal = $('#dhr-contactmodal'),
			$modalbody = $('.dhr-contactmodal--body'),
			$modalbodyLiner = $('.dhr-contactmodal--body-liner'),
			$modalbodyInner = $modalbody.find('.inner'),
			$modaltop = $('.dhr-contactmodal--top'),
			$maincontent = $('#dhr-main'),
			$fixedhero = $('.dhr-fixedhero'),
			$firstname = $('#dhr-contact-firstname-input'),
			$movecontents = $maincontent.add($fixedhero).add($sitefooter);
			
export const $modalstaggeritems = $('.dhr-contactmodal--intro, .dhr-contactmodal--form, .dhr-contactmodal--btns');

let isOpen = false;
let isTaller = false;
let modaltopHeight = $modaltop.outerHeight();

//opening
$modaltrigger.on('click', (e) => {
	e.preventDefault();
	if ($modal.hasClass('velocity-animating')) return;


	$modal.velocity({
		translateY: ['0%', '-100%']
	}, {
		duration: 600,
		visibility: 'visible',
		easing: easeOutBack
	});

	modaltopHeight = $modaltop.outerHeight();
	isTaller = ($modalbodyInner.outerHeight()+modaltopHeight) > $window.height();

	$modalbody.css({
		height: $window.height()-modaltopHeight-5
		//minHeight: $modalbodyInner.outerHeight()
	});

	if (isTaller) {
		$modalbody.addClass('is-taller');
	}


	$modalstaggeritems.velocity('transition.slideDownIn', {
		stagger:150, 
		drag:true, 
		duration:900,
		complete: () => {
			$body.addClass('is-ready-contactmodal');
		}
	});

	$movecontents.velocity({
		translateY: $window.height()
	}, {
		easing: easeOutBack,
		duration: 600,
		complete: () => $firstname.focus()
	});

	$body.addClass('is-showing-contactmodal');
	isOpen = true;
});


//closing
$modalclose.on('click', () => {
	$modal.velocity({
		translateY: ['-100%', '0%']
	}, {
		duration: 350,
		visibility: 'hidden',
		easing:'easeOutCirc',
		complete: () => { 
			$body.removeClass('is-showing-contactmodal is-ready-contactmodal');
			$modalstaggeritems.css({opacity:0});
			$(document).trigger('dhr.contactmodal.closed');
			isOpen = false;
		}
	});
	//$modalstaggeritems.velocity('transition.fadeOut', {duration:100})
	$movecontents.velocity({
		translateY: 0
	}, {
		easing:'easeOutCirc',
		duration: 350
	});
});



$window.resize(() => {
	isTaller = ($modalbodyInner.outerHeight()+modaltopHeight) > $window.height();

	if (isTaller) {
		$modalbody.addClass('is-taller');
	} else {
		$modalbody.removeClass('is-taller');
	}
	$modalbody.css({height: $window.height()-$modaltop.outerHeight() });
});




if (window.location.hash === '#contact') {
	$modaltrigger.trigger('click');
}


