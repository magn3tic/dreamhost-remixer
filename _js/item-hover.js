
import {$body, $window} from './globals.js';


const $hovercards = $('[data-hovercard]');




const getTransformValue = function(scaleAmount=false, maxDeg=5) {
	const $t = $(this);
	
	let halfW = $t.width()/2,
  		halfH = $t.height()/2,
  		coorX = (halfW - (event.pageX - $t.offset().left)),
  		coorY = (halfH - (event.pageY - $t.offset().top)),
  		degX  = ((coorY / halfH) * maxDeg)+'deg', 
  		degY  = -((coorX / halfW) * maxDeg)+'deg';
  
  scaleAmount = scaleAmount ? scaleAmount.toString() : '1.03';

  return `translateY(-2px) scale(${scaleAmount}) rotateX(${degX}) rotateY(${degY})`;
};

const getMousedownTransform = function() {

};




$hovercards.each(function() {
	
	if (Modernizr.touchevents) return;

	const $t = $(this),
				$parent = $t.parent(),
				isEpisode = $parent.hasClass('dhr-episodeitem'),
				scaleVal = $t.data('hovercard-scale') || '',
				tiltVal = $t.data('hovercard-tilt') || 7;

	let mousedover = false;

	$t.hover(function() {
		$parent.addClass('is-hovering');
		if (isEpisode) {
			$parent.siblings().addClass('is-nothovering');
		}
		mousedover = true;
	}, function() {
		$parent.removeClass('is-hovering');
		if (isEpisode) {
			$parent.siblings().removeClass('is-nothovering');
		}
		mousedover = false;
	});

	$t.on('mousemove', (event) => {
		$t.css({transform: getTransformValue.call($t, scaleVal, tiltVal)});
	});

	$t.mousedown(() => {
		if (mousedover) {
			//do a push-down effect
		}
	});

	$t.mouseleave(() => $t.attr('style',''));
});


