



const $socialLinks = $('[data-social-links]');
const $socialAnchors = $socialLinks.find('a:not([href^="mailto:"])');
const $mailtoAnchors = $socialLinks.find('a[href^="mailto"]');



$mailtoAnchors.each(function() {
	const $t = $(this);
	$t.attr('href', $t.attr('href').replace('%%url%%', window.location.href));
});




$socialAnchors.on('click', function(e) {
  e.preventDefault();
  
  const $t = $(this);
  const shareUrl = $t.attr('href').replace('%%url%%', window.location.href);
  
  $.centeredPopup({
    url: shareUrl,
    width: 400,
    height: 400
  });
});
