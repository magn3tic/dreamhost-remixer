
import {$body, $window} from './globals.js';



export const pushToDrip = (obj) => {
	if (window._dcq && window._dcs) {
		obj.tags = ['remixer_microsite'];
		window._dcq.push(['identify', obj]);
	} else {
		console.error('The getdrip.com js snippet is not installed!');
	}
};

const dripSuccessCallback = (event) => {
	$footerForm.removeClass('is-submitting');
	$footerForm.addClass('is-submitted-success');
};
const dripFailureCallback = (event) => {
	$footerForm.addClass('is-submitted-error');
};


const $footerForm = $('#dhr-footer-form');
const $emailInput = $('#dhr-footer-emailinput');
const $emailParent = $emailInput.parent('.dhr-formfield');



$emailInput.on('keyup blur', function() {
	if ($(this).val().length > 0) {
		$emailParent.addClass('is-filledin');
	} else {
		$emailParent.removeClass('is-filledin');
	}
});


$footerForm.submit((e) => {
	e.preventDefault();
	const emailVal = $emailInput.val();

	$footerForm.addClass('is-submitting');

	if (emailVal.length > 3 && emailVal.indexOf('@') > 0) {

		pushToDrip({
			email: emailVal,
			success: dripSuccessCallback,
			failure: dripFailureCallback
		});
	
	} else {

		$footerForm.addClass('is-submitted-error');
	}
});