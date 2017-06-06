// import Flickity from 'flickity';

export const $f = {
	carousel: $('.dhr-episode-carousel'),
	isOpen: false
};

$f.carousel.flickity({
	cellAlign: "left",
	cellSelector: ".cell-img",
	prevNextButtons: false,
	contain: true
});
