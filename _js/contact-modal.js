
import {$body, $sitefooter, $siteheader, $window, easeOutBack} from './globals.js';

// Contact Modal
const $modaltrigger = $('a[href="#contact"]'),
			$modalclose = $('#dhr-modalclose'),
			$modal = $('#dhr-contactmodal'),
			$modalbody = $('.dhr-contactmodal--body'),
			$modalbodyInner = $modalbody.find('.inner'),
			$modaltop = $('.dhr-contactmodal--top'),
			$maincontent = $('#dhr-main'),
			$fixedhero = $('.dhr-fixedhero'),
			$movecontents = $maincontent.add($fixedhero).add($sitefooter),
			$modalstaggeritems = $('.dhr-contactmodal--intro, .dhr-contactmodal--form, .dhr-contactmodal--btns, .dhr-contactmodal--social');


const $form = $('#dhr-contact-form'),
			$inputs = {
				email: $('#dhr-email-input'),
				firstname: $('#dhr-contact-firstname-input'),
				lastname: $('#dhr-contact-lastname-input')
			};


//opening
$modaltrigger.on('click', (e) => {
	e.preventDefault();

	if ($modal.hasClass('velocity-animating')) return;
	
	$modalbody.css({
		height: ($window.height()-$siteheader.outerHeight())*0.925
	});

	$modal.velocity({
		translateY: ['0%', '-100%']
	}, {
		duration: 600,
		display: 'block',
		easing: easeOutBack
	});

	$modalstaggeritems.velocity('transition.slideDownIn', {
		stagger:150, 
		drag:true, 
		duration:900,
		complete: () => {
			$modalbody.css({minHeight: $modalbodyInner.outerHeight()+30 });
			$body.addClass('is-ready-contactmodal');
		}
	});

	$movecontents.velocity({
		translateY: $window.height()
	}, {
		easing: easeOutBack,
		duration: 600,
		complete: () => $inputs.firstname.focus()
	});

	$body.addClass('is-showing-contactmodal');
});

//closing
$modalclose.on('click', () => {
	$modal.velocity({
		translateY: ['-100%', '0%']
	}, {
		duration: 350,
		display: 'none',
		easing:'easeOutCirc',
		complete: () => { 
			$body.removeClass('is-showing-contactmodal is-ready-contactmodal');
			$modalstaggeritems.css({opacity:0});

			$(document).trigger('dhr.contactmodal.closed');
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
	$modalbody.css({height: ($window.height()-$siteheader.outerHeight())*0.925 });
});

// $window.on('load', () => {
// 	$modalbody.css({minHeight: $modalbodyInner.outerHeight()});
// });




if (window.location.hash === '#contact') {
	$modaltrigger.trigger('click');
}


