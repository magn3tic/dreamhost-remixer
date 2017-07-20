
import {$body, $top, $window, $siteheader, easeOutBack} from './globals.js';

import {homevideo} from './pageload-sequence.js';


const $homeherotop = $('#dhr-hero-top'),
			$homeherobot = $('#dhr-hero-bottom'),
			$episodelist = $('#dhr-episode-list'),
			$playbtns = $('a[data-video]'),
			isHomePage = $body.hasClass('dhr-currentpage-index');


const dismissBeforeEnd = ($element, callback) => {
	$element.velocity('transition.fadeOut', {duration:650});
	$body.velocity('transition.fadeOut', {
		duration: 700,
		complete: () => callback()
	});
};


let isPlaying = false;


$playbtns.each(function(index) {

	const $t = $(this),
				$target = $($t.data('video-target')),
				$targetparent = $target.parent('.dhr-fluidvideo'),
				videopath = $target.data('video'),
				pageUrl = $target.data('link');
	
	let $closebtn = $('<button id="dhr-videoclose-'+index+'"><i class="icon-cancel" aria-hidden="true"></i><span class="sr-only">Close</span></button>'),
			$overlayBg = null,
			$overlayContent = null,
			$videoParent = null,
			$video = null,
			firstOpen = true,
			isPlayReady = false,
			plyrRef = null;


	$target.on('click', (event) => event.stopPropagation());


	//Play Button Click -------------------------//
	$t.on('click', (e) => {
		e.preventDefault();
		if ($target.hasClass('velocity-animating')) return;

		const videoHtml = `<video>
			<source src="${videopath}.webm" type="video/webm">
			<source src="${videopath}.mp4" type="video/mp4">
			<source src="${videopath}.ogv" type="video/ogg">
		</video>`;

		$body.removeClass('is-videoended').addClass('is-playingtriggered');
		$video = $(videoHtml);
		$target.append($video).prepend($closebtn);


		//plyr opts/events setup
		const vidplyr = window.plyr.setup($video[0], {
			controls: ['play', 'progress', 'mute', 'volume', 'fullscreen'],
			volume: 8
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
			$body.addClass('is-videoended');
			if (isHomePage) {
				dismissBeforeEnd($plyrEl, () => window.location.replace(pageUrl));
			} else {
				$closebtn.trigger('click');
			}
		});



		//measure to determine video height relative to window
		let expectedHeight = $targetparent.width() * 0.565,
				heightThreshold = $window.height()-80,
				isTaller = expectedHeight >= heightThreshold;


		//home page
		if (isHomePage) {
			
			$targetparent.velocity('scroll', {
				offset: !isTaller ? -(($window.height() - expectedHeight) / 2) : 0,
				duration: 500,
				complete: () => $target.velocity('slideDown', {duration: 1000, easing: 'easeOutQuart'})
			});

			$plyrEl.velocity({
				translateY: ['0%']
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

			$overlayBg = $('<div class="dhr-playeroverlay" style="display:none;"></div>');
			$overlayContent = $('<div class="dhr-playeroverlay--content"></div>');

			$body.append($overlayBg);
			$overlayBg.velocity('transition.fadeIn', {duration:350});
			
			$body.append($overlayContent);
			$targetparent.addClass('is-singlepage-player').detach().appendTo($overlayContent);
			
			$target.velocity('transition.slideUpBigIn', {duration:700, delay:90, complete: () => {
				$body.addClass('is-playingvideo');
				isPlaying = true;
			}});
		}


		//handle cases where video is taller than window
		if (isTaller) {
			let heightDiff = expectedHeight - heightThreshold;
			let sizeUpdate = 100 - Math.round((heightDiff / $targetparent.width())*100);
			
			console.log('Height Diff:', heightDiff);
			console.log(sizeUpdate);

			if (isHomePage) {
				$targetparent.css({width:sizeUpdate+'%', marginLeft:'auto', marginRight:'auto'});
			} else {
				$target.css({width:sizeUpdate+'%', marginLeft:'auto', marginRight:'auto'});
			}

			$body.addClass('is-tallervideo');
		}

		firstOpen = false;
	});
	
	


	$closebtn.on('click', () => {
		if ($target.hasClass('velocity-animating')) return;
		if ($overlayBg && $overlayBg.hasClass('velocity-animating')) return;
		if (!isPlaying) return;

		plyrRef.pause();
		
		//home player
		if (isHomePage) {
			$target.velocity('slideUp', {
				duration: 750, 
				easing: 'easeOutCirc',
				complete: () => {
					plyrRef.destroy();
					plyrRef = null;
					$target.find('video').remove();
					isPlaying = false;
					homevideo.play();
				}
			});

			$top.velocity('scroll', {duration: 450, delay: 300});

			$targetparent.removeAttr('style');

		//other pages
		} else {

			const $modals = $overlayBg.add($overlayContent);
			
			$target.velocity('transition.slideDownBigOut', {duration:120, complete: () => {
				plyrRef.destroy();
				plyrRef = null;
				$target.find('video').remove();
				isPlaying = false;
			}});

			$modals.velocity('transition.fadeOut', {duration: 220, complete: () => {
				$modals.detach();
			}});

			$target.removeAttr('style');
		}

		
		$body.removeClass('is-playingtriggered is-playingvideo is-tallervideo');
	});

}); //end each()




$(document).on('click', () => {
	if (!isPlaying) return;
	$('button[id^="dhr-videoclose-"]').trigger('click');
});

