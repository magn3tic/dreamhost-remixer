
import {$sitefooter} from './globals.js';
import {$emailInput} from './email-subscribe.js';

const $allepisodes = $('.dhr-episodeitem'),
			cdSec = 1000,
	    cdMin = cdSec * 60,
	    cdHr = cdMin * 60,
	    cdDay = cdHr * 24;

let currentdate = new Date(),
		currentepoch = currentdate.getTime(),
		$lockedepisodes = null;


//new time every second
window.setInterval(() => {
	currentdate = new Date();
	currentepoch = currentdate.getTime();
	$(document).trigger('clocktick');
}, 1000);

//helpers
const doHtmlUpdate = ($html, until) => { 
	let divisions = Object.keys(until);
	for(let i=0; i < divisions.length; i++) {
		$html[divisions[i]].text(until[divisions[i]]);
	}
};
const digitPrefixer = (digit) => {
	let strdigit = digit.toString(),
			result = strdigit.length > 1 ? strdigit : '0'+strdigit;
	return result;
};



//go through once to determine which items need countdowns
$allepisodes.each(function() {
	const $t = $(this),
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
$lockedepisodes.each((index, item) => {

	const $this = $(item),
				$countdown = $this.find('[data-countdown]'),
				unlockepoch = new Date($countdown.data('countdown')).getTime(),
				$html = {
					days: $countdown.find('[data-countdown-days] .dhr-countdown--num'),
					hours: $countdown.find('[data-countdown-hours] .dhr-countdown--num'),
					mins: $countdown.find('[data-countdown-mins] .dhr-countdown--num'),
					sec: $countdown.find('[data-countdown-sec] .dhr-countdown--num')
				};

	let timeDiff = unlockepoch - currentepoch,
			until = {
				days: digitPrefixer(Math.floor(timeDiff/cdDay)),
				hours: digitPrefixer(Math.floor((timeDiff%cdDay)/cdHr)),
				mins: digitPrefixer(Math.floor((timeDiff%cdHr)/cdMin)),
				sec: digitPrefixer(Math.floor((timeDiff%cdMin)/cdSec))
			};

	if (timeDiff >= 0) {
		
		window.setTimeout(() => doHtmlUpdate($html, until), 150*index);

		$(document).on('clocktick', () => {
			timeDiff = unlockepoch - currentepoch;
			until.days = digitPrefixer(Math.floor(timeDiff/cdDay));
			until.hours = digitPrefixer(Math.floor((timeDiff % cdDay) / cdHr));
			until.mins = digitPrefixer(Math.floor((timeDiff%cdHr)/cdMin));
			until.sec = digitPrefixer(Math.floor((timeDiff%cdMin)/cdSec));

			if (timeDiff >= 0) {
				window.setTimeout(() => doHtmlUpdate($html, until), 150*index);
			} else {
				$countdown.remove()
			}
		});

		$this.addClass('is-countdownstarted')
		  .children('a[class*="--link"]').click((e) => {
		  	e.preventDefault();
		  	$sitefooter.velocity('scroll', {duration:550, easing:'easeOutCirc', complete: () => {
		  		$emailInput.focus();
		  	}});
		  });
		
	} else {
			
		$this.removeClass('dhr-episodeitem--locked');
		$countdown.remove();
		
	}

});



