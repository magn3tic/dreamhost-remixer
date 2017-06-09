
import {$body, $window} from './globals.js';


const $hovercards = $('[data-hovercard]');


const getTransformValue = function(scaleAmount=false) {
	const maxDeg = 7, $t = $(this);
	
	let halfW = ($t.width() / 2),
  		halfH = ($t.height() / 2),
  		coorX = (halfW - (event.pageX - $t.offset().left)),
  		coorY = (halfH - (event.pageY - $t.offset().top)),
  		degX  = ((coorY / halfH) * maxDeg).toFixed(2)+'deg', 
  		degY  = -((coorX / halfW) * maxDeg).toFixed(2)+'deg';
  
  scaleAmount = scaleAmount ? scaleAmount.toString() : '1.03';

  console.log(scaleAmount);

  return `translate3d(0, -2px, 0) scale(${scaleAmount}) rotateX(${degX}) rotateY(${degY})`;
};




$hovercards.each(function() {
	
	if (Modernizr.touchevents) return;

	const $t = $(this),
				$parent = $t.parent(),
				scaleVal = $t.data('hovercard-scale') || '';

	let mousedover = false;

	$t.hover(function() {
		$parent.addClass('is-hovering').siblings().addClass('is-nothovering');
		mousedover = true;
	}, function() {
		$parent.removeClass('is-hovering').siblings().removeClass('is-nothovering');
		mousedover = false;
	});

	$t.mousemove((event) => {
		$t.css({
			'transform': getTransformValue.call($t, scaleVal)
		});
	});

	$t.mousedown(() => {});

	$t.mouseleave(() => $t.attr('style',''));
});


