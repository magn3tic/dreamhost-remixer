
import {$body, $sitefooter, $window, easeOutBack} from './globals.js';

// Contact Modal
const $modaltrigger = $('a[href="#contact"]'),
			$modalclose = $('#dhr-modalclose'),
			$modal = $('#dhr-contactmodal'),
			$modalbody = $('.dhr-contactmodal--body'),
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
	$modalbody.css({height: ($window.height()-$modaltop.outerHeight())*0.87 });
	$modal.velocity({
		translateY: ['0%', '-100%']
	}, {
		duration: 600,
		display: 'block',
		easing: easeOutBack
	});
	$modalstaggeritems.velocity('transition.fadeIn', {stagger:130, drag:true, duration:350});
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
			$body.removeClass('is-showing-contactmodal');
			//$modalstaggeritems.css({display:'none'});
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

$window.resize(() => $modalbody.css({height:$window.height()-$modaltop.outerHeight()-5}));

if (window.location.hash === '#contact') {
	$modaltrigger.trigger('click');
}


