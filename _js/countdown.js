

const $lockedepisodes = $('.dhr-episodeitem--locked'),
			cdSec = 1000,
	    cdMin = cdSec * 60,
	    cdHr = cdMin * 60,
	    cdDay = cdHr * 24;

let currentdate = new Date(),
		currentepoch = currentdate.getTime();


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
	//console.log(result);
	return result;
};


//go through each locked episode
$lockedepisodes.each((index, item) => {

	const $this = $(item),
				$countdown = $this.find('[data-countdown]'),
				unlockepoch = parseInt($countdown.data('countdown')),
				unlocktime = new Date(unlockepoch),
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

	doHtmlUpdate($html, until);

	//every second
	$(document).on('clocktick', () => {
		timeDiff = unlockepoch - currentepoch;
		until.days = digitPrefixer(Math.floor(timeDiff/cdDay));
		until.hours = digitPrefixer(Math.floor((timeDiff % cdDay) / cdHr));
		until.mins = digitPrefixer(Math.floor((timeDiff%cdHr)/cdMin));
		until.sec = digitPrefixer(Math.floor((timeDiff%cdMin)/cdSec));
		doHtmlUpdate($html, until);
	});

	$this.click((event) => event.preventDefault())
			 .addClass('is-countdownstarted');
});



