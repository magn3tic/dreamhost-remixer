
import {$body, $window} from './globals.js';


const $hovercards = $('[data-hovercard]');




const getTransformValue = function(scaleAmount=false, maxDeg=7) {
	const $t = $(this);
	
	let halfW = ($t.width() / 2),
  		halfH = ($t.height() / 2),
  		coorX = (halfW - (event.pageX - $t.offset().left)),
  		coorY = (halfH - (event.pageY - $t.offset().top)),
  		degX  = ((coorY / halfH) * maxDeg).toFixed(2)+'deg', 
  		degY  = -((coorX / halfW) * maxDeg).toFixed(2)+'deg';
  
  scaleAmount = scaleAmount ? scaleAmount.toString() : '1.03';

  return `translate3d(0, -2px, 0) scale(${scaleAmount}) rotateX(${degX}) rotateY(${degY})`;
};

const getMousedownTransform = function() {

};




$hovercards.each(function() {
	
	if (Modernizr.touchevents) return;

	const $t = $(this),
				$parent = $t.parent(),
				scaleVal = $t.data('hovercard-scale') || '',
				tiltVal = $t.data('hovercard-tilt') || 7;

	let mousedover = false;

	$t.hover(function() {
		$parent.addClass('is-hovering').siblings().addClass('is-nothovering');
		mousedover = true;
	}, function() {
		$parent.removeClass('is-hovering').siblings().removeClass('is-nothovering');
		mousedover = false;
	});

	$t.mousemove((event) => {
		let transformValue = getTransformValue.call($t, scaleVal, tiltVal);
		$t.css({
			'transform': transformValue,
			'-ms-transform:': transformValue
		});
	});

	$t.mousedown(() => {

	});

	$t.mouseleave(() => $t.attr('style',''));
});


