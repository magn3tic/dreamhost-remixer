

const $lockedepisodes = $('.dhr-episodeitem--locked');

let currentdate = new Date(),
		currentepoch = currentdate.getTime();

let cdSec = 1000,
    cdMin = cdSec * 60,
    cdHr = cdMin * 60,
    cdDay = cdHr * 24;


const doTimeUpdate = ($html) => { 

};


$lockedepisodes.each((index, item) => {

	const $this = $(item),
				$countdown = $this.find('[data-countdown]'),
				unlockepoch = parseInt($countdown.data('countdown')),
				unlocktime = new Date(unlockepoch),

				$html = {
					days: $countdown.find('[data-countdown-days]'),
					hours: $countdown.find('[data-countdown-hours]'),
					mins: $countdown.find('[data-countdown-mins]')
				};


	let timeDiff = unlockepoch - currentepoch;

	let daysTil = Math.floor(timeDiff/cdDay);



	console.log(daysTil);
	

	$this.click((event) => event.preventDefault())
			 .addClass('is-countdownstarted');

});