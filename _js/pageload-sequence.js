
import SplitText from './splittext.js';
import {$body, $window, easeOutBack} from './globals.js';


const $top = $('#top'),
			$loadscreen = $('#dhr-loadscreen'),
			$homevideo = $('#dhr-home-videoel'),
			homevideo = $homevideo.length === 1 ? $homevideo[0] : false;

const pageOutDuration = 500,
			isHomePage = $body.hasClass('dhr-currentpage-index');



//animation prep stuff / on domready
const $spltels = $('.dhr-preheadline, .dhr-sectionheadline, .dhr-mainheadline'),
			splttxt = new SplitText($spltels, {type:'lines'});

const unwrapSplitText = (elements) => {
	elements.forEach((item, i) => $(item).unwrap());
};

splttxt.lines.forEach((item, i) => {
	$(item).wrap('<div class="dhr-splttxt-line"></div>').css({opacity:0});
});
	




//internal links - on navigate away
const $transitionlinks = $('a[data-page-transition]');

$transitionlinks.click(function(event) {
	event.preventDefault();
	let href = $(this).attr('href');

	if (href.indexOf('#') === 0) return; 

	$top.velocity('scroll', {duration: pageOutDuration});
	$body.addClass('is-pagetransitioning').velocity('transition.fadeOut', {duration: pageOutDuration});
			 
	setTimeout(() => window.location.replace(href), pageOutDuration);
});





//on page fully loaded
const onFullPageload = () => {
	
	$body.addClass('is-fullyloaded');

	$top.velocity('scroll', {duration:50});


	splttxt.lines.forEach((item, index) => {
		$(item).velocity({
			translateY:['0px', '50px'], 
			opacity:[1, 0]
		}, {
			easing:'easeOutQaurt', 
			duration:500, 
			delay:100*index,
			complete: () => {
			}
		});
	});


	$loadscreen.velocity('transition.fadeOut', {duration:330, delay:100});

	
	if (isHomePage) {
		homevideo.play();
	}

};


if (window.Pace) {
	Pace.on('done', onFullPageload, window);
} else {
	$window.on('load', onFullPageload);
}