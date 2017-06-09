export const $f = {
	carousel: $('.dhr-episode-carousel'),
	isOpen: false
};

if ($f.carousel.length) {
	$f.carousel.flickity({
		cellAlign: "left",
		cellSelector: ".cell-img",
		prevNextButtons: false,
		contain: true
	});
}
