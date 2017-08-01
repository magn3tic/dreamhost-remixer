
//"globals"
export const $body = $('body'),
						 $head = $('head'),	
						 $window = $(window),
						 $top = $('#top'),
						 $siteheader = $('#dhr-header'),
						 $sitemain = $('#dhr-main'),
						 $sitefooter = $('#dhr-footer'),
						 fadeIn = window.location.hash === '#fademode',
						 isDev = window.location.hostname === 'localhost',
						 needsVideoSwap = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent),
						 isAutoplayLink = window.location.hash === '#autoplay',
						 easeOutBack = [0.0755, 0.985, 0.325, 1.07];

export const getVideoHtml = (poster, videopath) => {
	return `<video class="dhr-native-video" poster="${poster}" controls>
				    <source src="${videopath}.webm" type="video/webm">
						<source src="${videopath}.mp4" type="video/mp4">
						<source src="${videopath}.ogv" type="video/ogg">
					</video>`;
};