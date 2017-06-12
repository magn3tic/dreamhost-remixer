
import {$body, $window, $siteheader, easeOutBack} from './globals.js';


const $homeherotop = $('#dhr-hero-top'),
			$homeherobot = $('#dhr-hero-bottom'),
			$episodelist = $('#dhr-episode-list'),
			$playbtns = $('a[data-video]');

const isHomePage = $body.hasClass('dhr-currentpage-index'),
			isPlaying = false;




$playbtns.each(function() {

	const $t = $(this),
				$target = $($t.data('video-target')),
				$targetparent = $target.parent('.dhr-fluidvideo'),
				videopath = $t.data('video'),
				$video = $('<video src="'+videopath+'.mp4"></video>');

	$t.on('click', (e) => {
		e.preventDefault();

		if (isHomePage) {
			let expectedHeight = $targetparent.width() * 0.525,
					isTaller = expectedHeight >= $window.height();
		

			$targetparent.velocity('scroll', {
				offset: !isTaller ? -(($window.height() - expectedHeight) / 2) : 0,
				duration: 550,
				complete: () => $target.velocity('slideDown', {duration: 650, easing:easeOutBack})
			});
			//$target.velocity('slideDown', {duration: 1400, easing:'spring', delay: 200});

		} else {


		}

	});

});