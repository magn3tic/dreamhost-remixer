
import {$body, $window, isDev} from './globals.js';


let lastSubscriber = false;
let isSubmitting = false;


export const trackFacebookEvent = (eventname, val=1.00, currency='USD') => {
	if (eventname.length > 0) {
		if (window.fbq) {
			fbq('trackCustom', eventname, {
		    value: val,
		    currency: currency
		  });
		} else {
			console.error('The Facebook (fbq) tracking library isn not installed!');
		}
	}
};


export const pushToDrip = (obj) => {
	if (window._dcq && window._dcs) {
		obj.tags = ['remixer_microsite'];
		window._dcq.push(['identify', obj]);
	} else {
		console.error('The getdrip.com js snippet is not installed!');
	}
};

const dripSuccessCallback = (event) => {
	if (isDev) { console.log(event); }
	if (event && event.success) {
		$footerForm
			.removeClass('is-submitting is-submitted-invalid is-submitted-error')
			.addClass('is-submitted-success');
		$submitBtn.removeAttr('disabled');

		lastSubscriber = event.email;

		trackFacebookEvent('Signup_Stories');

		$(document).one('click', () => {
			$footerForm.removeClass('is-submitted-success');
			$emailInput.val('').parent('.is-filledin').removeClass('is-filledin');
		});
	} else {
		dripFailureCallback.call();
	}
	isSubmitting = false;
};

const dripFailureCallback = (event) => {
	$footerForm.removeClass('is-submitted-invalid').addClass('is-submitted-error');
	$emailInput.focus();
	isSubmitting = false;
};


const $footerForm = $('#dhr-footer-form');
const $submitBtn = $('#dhr-footer-submit');
export const $emailInput = $('#dhr-footer-emailinput');
const $emailParent = $emailInput.parent('.dhr-formfield');


//form submit handler
const onEmailFormSubmit = () => {
	const emailVal = $emailInput.val();

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


$emailInput.on('keyup blur', function() {
	if ($(this).val().length > 0) {
		$emailParent.addClass('is-filledin');
	} else {
		$emailParent.removeClass('is-filledin');
	}
});


$submitBtn.on('mousedown touchstart', () => {
	$footerForm.trigger('submit');
});


$footerForm.submit((e) => {
	e.preventDefault();

	if (isSubmitting) return;

	isSubmitting = true;

	$footerForm.addClass('is-submitting').removeClass('is-submitted-invalid is-submitted-error');
	$submitBtn.attr('disabled', true);

	window.setTimeout(() => onEmailFormSubmit(), 0);
});
