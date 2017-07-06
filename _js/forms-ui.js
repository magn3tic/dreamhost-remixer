

import {$window, $body} from './globals.js';



const $form = $('#dhr-contact-form'),
			$fields = $form.find('input, select');


const filledInCheck = ($field, $outer) => {
	if ($field.val().length > 0) {
		$outer.addClass('is-filledin');
	} else {
		$outer.removeClass('is-filledin');
	}
};



$fields.each(function() {
	const $t = $(this),
				$outer = $t.parent('.dhr-inlineform--input'),
				isSelect = $outer.data('field-type') === 'select';

	if (isSelect) {

		$t.on('change', () => filledInCheck($t, $outer));

	} else {

		$t.on('keyup keydown blur', () => filledInCheck($t, $outer));

	}
});




$form.on('submit', (e) => {

	e.preventDefault();

	//do validation
	const formData = $form.serialize();
	console.log(formData);

	$.ajax({
		url: 'https://formspree.io/kenny@mag.cr',
		method: 'POST',
		dataType: 'json',
		data: formData
	});

});