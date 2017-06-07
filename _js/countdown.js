

const $lockedepisodes = $('.dhr-episodeitem--locked');






$lockedepisodes.each((index, item) => {

	const $this = $(item),
				$countdown = $this.find('[data-countdown]'),
				unlocktime = $countdown.data('countdown');



});