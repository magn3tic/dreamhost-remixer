
import {$body, $window, $siteheader, easeOutBack} from './globals.js';

import {homevideo} from './pageload-sequence.js';


const $homeherotop = $('#dhr-hero-top'),
			$homeherobot = $('#dhr-hero-bottom'),
			$episodelist = $('#dhr-episode-list'),
			$playbtns = $('a[data-video]');

const isHomePage = $body.hasClass('dhr-currentpage-index');
let isPlaying = false;




$playbtns.each(function() {

	const $t = $(this),
				$target = $($t.data('video-target')),
				$targetparent = $target.parent('.dhr-fluidvideo'),
				videopath = $t.data('video'),
				$video = $('<video controls src="'+videopath+'.mp4"></video>');


	$t.on('click', (e) => {
		e.preventDefault();

		$target.append($video);
		$body.addClass('is-playingtriggered');

		if (isHomePage) {
			let expectedHeight = $targetparent.width() * 0.525,
					isTaller = expectedHeight >= $window.height();
		
			$targetparent.velocity('scroll', {
				offset: !isTaller ? -(($window.height() - expectedHeight) / 2) : 0,
				duration: 550,
				complete: () => $target.velocity('slideDown', {duration: 650, easing: easeOutBack})
			});

			const vidplyr = window.plyr.setup($video[0], {
				controls: ['progress', 'fullscreen', 'volume', 'mute'],
				hideControls: false
			}),
			$plyrEl = $target.find('.plyr--video');

			
			vidplyr[0].on('ready', (event) => {
				isPlaying = true;
			});

			$plyrEl.velocity({translateY:['0%','100%']}, {
				duration: 1000, 
				delay: 1200, 
				easing:'easeOutCirc', 
				begin: () => {
					vidplyr[0].play();
				},
				complete: () => { 
					homevideo.pause();
					$body.addClass('is-playingvideo');
				}
			});

		} else {


		}
	});





});