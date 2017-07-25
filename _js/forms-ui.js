

import {$window, $body, isDev} from './globals.js';
import {pushToDrip} from './email-subscribe.js';
import {$modalstaggeritems} from './contact-modal.js';


const $form = $('#dhr-contact-form');

const $fields = $form.find('[data-required]');

const $emailInput = $('#dhr-contact-email-input');
const $submitBtn = $form.find('[type="submit"]');
const $finalSuccessMsg = $('.dhr-contactmodal--success');
const $finalSuccessClose = $('#secondary-modal-close');
const $modalContentsLiner = $('.dhr-contactmodal--body-liner > .inner');


let hasBeenSubmitted = false;


//general validation
const validationCheck = () => {
	let filled = [];
	const emailVal = $emailInput.val();

	$fields.each(function(index) {
		const $t = $(this);
		const $parent = $t.parent('.dhr-inlineform--input');
		if ($t.val().length) {
			filled.push(index);
			$parent.removeClass('is-fieldinvalid');
		} else {
			$parent.addClass('is-fieldinvalid');
		}
	});
	return filled.length === $fields.length && emailVal.indexOf('@') > 0;
};
const filledInCheck = ($field, $outer) => {
	if ($field.val().length > 0) {
		$outer.removeClass('is-fieldinvalid').addClass('is-filledin');
	} else {
		$outer.removeClass('is-filledin');
	}
};


//form final success
const formSuccessFinal = () => {
	$modalContentsLiner.css({height: $modalContentsLiner.outerHeight()});
	$modalstaggeritems.velocity('transition.slideUpOut', {stagger:100, drag:true, duration:550});
	$finalSuccessMsg.velocity('transition.slideUpIn', {duration: 600, delay:500, display:'flex'});
};


//drip failure callback
const dripOnFail = (e) => {
	$form.removeClass('is-submitting').addClass('is-formerror');
	$submitBtn.removeAttr('disabled');
};

//obj to send to drip
const dripData = {
	success: (event) => {
		if (isDev) console.log(event);
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




const onFormSubmit = (dripObject) => {
	if (validationCheck()) {
		if (isDev) console.log(dripObject);

		//testing failure / success msg
		//dripOnFail();
		$form.removeClass('is-submitting');
		hasBeenSubmitted = true;

		pushToDrip(dripObject);

	} else {

		$submitBtn.removeAttr('disabled');
		$form.removeClass('is-submitting').addClass('is-forminvalid');
		$form.find('.is-fieldinvalid [name^="fields"]').first().trigger('focus');
	}
};



$fields.each(function() {
	const $t = $(this),
				$outer = $t.parent('.dhr-inlineform--input'),
				isSelect = $outer.data('field-type') === 'select';
	
	let name = $t.attr('name');
	name = name.replace('fields[','');
	name = name.replace(']','');
	dripData[name] = null;

	if (isSelect) {
		$t.on('change', () => filledInCheck($t, $outer));
	} else {
		$t.on('keyup keydown blur', () => filledInCheck($t, $outer));
	}
});



$form.on('submit', (event) => {
	event.preventDefault();
	$form.removeClass('is-forminvalid is-formerror').addClass('is-submitting')
		.find('.is-fieldinvalid').removeClass('is-fieldinvalid');
	$submitBtn.attr('disabled', true);

	for (let prop in dripData) {
		if (prop !== 'success' && prop !== 'failure') {
			const $field = $form.find('[name="fields['+prop+']"]');
			dripData[prop] = $field.val();
		}
	}
	setTimeout(() => onFormSubmit(dripData), 500);
});



//hack to allow user to navigate to drip's hosted form (must POST not GET)
$('.dhr-contactmodal--error').find('a').on('click', (e) => {
	e.preventDefault();
	const $hiddenform = $('#dhr-hidden-post-form');
	for (let prop in dripData) {
		if (prop && prop !== 'failure' && prop !== 'success') {
			console.log(prop);
			$hiddenform.find('input[name="fields['+prop+']"]').val(dripData[prop]);
		}
	}
	$hiddenform.trigger('submit');
});


//when contact modal is closed
$(document).on('dhr.contactmodal.closed', () => {
	if (hasBeenSubmitted) {
		if (isDev) {console.log('contact is closed');}

		$fields.val('');
		$('.dhr-inlineform--input.is-filledin').removeClass('is-filledin');
		$modalContentsLiner.removeAttr('style');
		$finalSuccessMsg.removeAttr('style');
	}
});


$finalSuccessClose.on('click', (e) => {
	e.preventDefault();
	$('#dhr-modalclose').trigger('click');
});

