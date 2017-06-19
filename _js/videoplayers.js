
import {$body, $top, $window, $siteheader, easeOutBack} from './globals.js';

import {homevideo} from './pageload-sequence.js';


const $homeherotop = $('#dhr-hero-top'),
			$homeherobot = $('#dhr-hero-bottom'),
			$episodelist = $('#dhr-episode-list'),
			$playbtns = $('a[data-video]');

const isHomePage = $body.hasClass('dhr-currentpage-index');

let isPlaying = false;




$playbtns.each(function(index) {

	const $t = $(this),
				$target = $($t.data('video-target')),
				$targetparent = $target.parent('.dhr-fluidvideo'),
				videopath = $t.data('video'),
				$video = $('<video controls src="'+videopath+'.mp4"></video>');
	
	let $closebtn = $('<button id="dhr-videoclose-'+index+'"><i class="icon-cancel" aria-hidden="true"></i><span>Close</span></button>'),
			firstOpen = true,
			isPlayReady = false,
			plyrRef = null;


	//Play Button Click -------------------------//
	$t.on('click', (e) => {
		e.preventDefault();

		if (!firstOpen) {
			$closebtn = $('<button id="dhr-videoclose-'+index+'"><i class="icon-cancel" aria-hidden="true"></i><span>Close</span></button>');
		}

		$target.append($video).prepend($closebtn);
		$body.addClass('is-playingtriggered');

		//home page
		if (isHomePage) {
			
			let expectedHeight = $targetparent.width() * 0.525,
					isTaller = expectedHeight >= $window.height();
		
			$targetparent.velocity('scroll', {
				offset: !isTaller ? -(($window.height() - expectedHeight) / 2) : 0,
				duration: 500,
				complete: () => $target.velocity('slideDown', {duration: 650, easing: easeOutBack})
			});

			const vidplyr = window.plyr.setup($video[0], {
				controls: ['progress', 'fullscreen', 'volume', 'mute'],
				hideControls: false
			}),
			$plyrEl = $target.find('.plyr--video');

			plyrRef = vidplyr[0];

			plyrRef.on('ready', (event) => {
				isPlayReady = true;
				if (!isPlaying) {
					vidplyr[0].play();
					isPlaying = true;
				}
			});

			$plyrEl.velocity({
				translateY: ['0%','100%']
			}, {
				duration: 900, 
				delay: 1150, 
				easing:'easeOutCirc', 
				begin: () => {
					if (plyrRef.isReady()) {
						plyrRef.play();
						isPlaying = true;
					} 
				},
				complete: () => { 
					homevideo.pause();
					$body.addClass('is-playingvideo');
				}
			});


		//single story / features
		} else {


		}

		firstOpen = false;
	});
	
	
	$closebtn.on('click', () => {
		if ($target.hasClass('velocity-animating')) return;

		$target.velocity('slideUp', {
			duration: 400, 
			easing: 'easeOutCirc',
			complete: () => {

				plyrRef.destroy();
				$target.find('video').remove();
				isPlaying = false;
				plyrRef = null;

				homevideo.play();
			}
		});

		$top.velocity('scroll', {duration: 400});

		$body.removeClass('is-playingtriggered is-playingvideo');

	});


}); //end each()