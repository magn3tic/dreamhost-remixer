

import {$window, $body} from './globals.js';
import {pushToDrip} from './email-subscribe.js';


const $form = $('#dhr-contact-form');
const $fields = $form.find('[name^="fields["]');

const $emailInput = $('#dhr-contact-email-input');
const $submitBtn = $form.find('[type="submit"]');

let formData = {
	success: () => {

	},
	failure: () => {

	}
};


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


const onFormSubmit = (dripObject) => {
	$form.removeClass('is-submitting');
	
	if (validationCheck()) {

		$submitBtn.removeAttr('disabled');
		$form.removeClass('is-invalid').addClass('is-formvalid');
		return;
		
		pushToDrip(dripObject);

	} else {

		$form.addClass('is-forminvalid');
		$form.find('.is-fieldinvalid').first().trigger('focus');
	}

	$submitBtn.removeAttr('disabled');
};



$fields.each(function() {
	const $t = $(this),
				$outer = $t.parent('.dhr-inlineform--input'),
				isSelect = $outer.data('field-type') === 'select';
	
	let name = $t.attr('name');
	name = name.replace('fields[','');
	name = name.replace(']','');
	formData[name] = null;

	if (isSelect) {
		$t.on('change', () => filledInCheck($t, $outer));
	} else {
		$t.on('keyup keydown blur', () => filledInCheck($t, $outer));
	}
});



$form.on('submit', (event) => {
	event.preventDefault();
	$form.addClass('is-submitting');
	$submitBtn.attr('disabled', true);

	for (let prop in formData) {
		formData[prop] = $form.find('[name="fields['+name+']"]').val();
	}

	setTimeout(() => onFormSubmit(), 1000);
});



$(document).on('dhr.contactmodal.closed', () => {

});

