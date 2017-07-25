
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
						 easeOutBack = [0.0755, 0.985, 0.325, 1.07];