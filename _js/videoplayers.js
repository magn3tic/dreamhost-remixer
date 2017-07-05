
import {$body, $top, $window, $siteheader, easeOutBack} from './globals.js';

import {homevideo} from './pageload-sequence.js';


const $homeherotop = $('#dhr-hero-top'),
			$homeherobot = $('#dhr-hero-bottom'),
			$episodelist = $('#dhr-episode-list'),
			$playbtns = $('a[data-video]'),

			isHomePage = $body.hasClass('dhr-currentpage-index');


let isPlaying = false;





$playbtns.each(function(index) {

	const $t = $(this),
				$target = $($t.data('video-target')),
				$targetparent = $target.parent('.dhr-fluidvideo'),
				videopath = $target.data('video'),
				pageUrl = $target.data('link');
	
	let $closebtn = $('<button id="dhr-videoclose-'+index+'"><i class="icon-cancel" aria-hidden="true"></i><span class="sr-only">Close</span></button>'),
			$video = null,
			firstOpen = true,
			isPlayReady = false,
			plyrRef = null;


	const dismissBeforeEnd = ($element, callback) => {
		$element.velocity('transition.fadeOut', {duration:650});
		$body.velocity('transition.fadeOut', {
			duration: 700,
			complete: () => callback()
		});
	};


	//Play Button Click -------------------------//
	$t.on('click', (e) => {
		e.preventDefault();
		if ($target.hasClass('velocity-animating')) return;

		$video = $('<video controls src="'+videopath+'"></video>');

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
				controls: ['play', 'progress', 'mute', 'volume', 'fullscreen'],
				volume: 7
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

			plyrRef.on('ended', (event) => {
				//$body.addClass('is-videoended');
				dismissBeforeEnd($plyrEl, () => window.location.replace(pageUrl));
			});

			$plyrEl.velocity({
				translateY: ['0%','100%']
			}, {
				duration: 700, 
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
		plyrRef.pause();
		$target.velocity('slideUp', {
			duration: 450, 
			easing: 'easeOutCirc',
			complete: () => {
				plyrRef.destroy();
				plyrRef = null;
				$target.find('video').remove();
				isPlaying = false;
				homevideo.play();
			}
		});
		$body.removeClass('is-playingtriggered is-playingvideo');
		$top.velocity('scroll', {duration: 450});
	});


}); //end each()