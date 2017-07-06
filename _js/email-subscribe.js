
import {$body, $window} from './globals.js';

let $sendgridEmailInput = null,
		$sendgridEmailLabel = null,
		$sendgridFormEl = null,
		$sendgridSubmit = null,
		$sendgridNewSubmit = null;

const $sendgridForm = $('.sendgrid-subscription-widget'),
			loadSendgridLib = $.getScript('//s3.amazonaws.com/subscription-cdn/0.2/widget.min.js'),

			submitBtnHtml = '<span class="sr-only">Submit</span><svg x="0px" y="0px" viewBox="0 0 180 135"><path class="st0" d="M105.5,16.4L105.5,16.4c-3.9,3.9-3.9,10.2,0,14.1L132,57H23.1c-5.5,0-10,4.5-10,10c0,5.5,4.5,10,10,10h108.6l-26.5,26.5c-3.9,3.9-3.9,10.2,0,14.1v0c3.9,3.9,10.2,3.9,14.1,0L163,73.9c3.9-3.9,3.9-10.2,0-14.1l-43.3-43.3C115.8,12.5,109.4,12.5,105.5,16.4"></svg>';



const setupInputHandlers = ($inputs) => {
	$inputs.on('keyup keydown change', function() {
		const $t = $(this), $p = $t.parent('.dhr-formfield');
		if ($t.val().length > 0) {
			$p.addClass('is-filledin');
		} else {
			$p.removeClass('is-filledin');
		}
	});
};


//subscribe form event handlers
$sendgridForm.on({
	ready: () => {
		$sendgridFormEl = $sendgridForm.find('form');
		$sendgridEmailInput = $sendgridForm.find('input[name="email"]');
		$sendgridEmailLabel = $sendgridEmailInput.parent('label');
		$sendgridSubmit = $sendgridForm.find('input[type="submit"]');

		setupInputHandlers($sendgridEmailInput);
		
		$sendgridEmailInput.attr({placeholder:'your.name@email.com',autocomplete:'off',required:'true'});
		$sendgridEmailInput.after('<span class="dhr-footer--emailborder"></span>');
		$sendgridEmailInput.prev('span').addClass('sr-only').wrap('<label></label>');

		$sendgridFormEl.wrapInner('<div class="inner-large"></div>');
		$sendgridEmailLabel.add($sendgridSubmit).wrapAll('<div class="dhr-formfield"></div>');
		$sendgridSubmit.wrap('<button class="dhr-footer--submit" type="submit"></button>');

		$sendgridNewSubmit = $sendgridForm.find('.dhr-footer--submit');

		$sendgridEmailLabel.contents().unwrap();
		$sendgridNewSubmit.html(submitBtnHtml);
	},
	sent: (e) => {
		$sendgridForm.removeClass('is-error is-success is-submitted').addClass('is-submitting');
		$sendgridNewSubmit.attr('disabled', true);
	},
	error: () => {
		$sendgridNewSubmit.removeAttr('disabled');
		$sendgridForm.removeClass('is-submitting').addClass('is-submitted is-error');
	},
	success: () => {
		$sendgridNewSubmit.removeAttr('disabled');
		$sendgridForm.removeClass('is-error is-submitting').addClass('is-submitted is-success');
	}
});


loadSendgridLib.done((script, status) => {});