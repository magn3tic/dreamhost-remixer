

//allows designer options to be removed for production w/o error
window.designerOptions = window.designerOptions || {};


// in viewport test
window.$.fn.inView = function(partial) {
  var $t = $(this),
      $w = $(window),
      viewTop = $w.scrollTop(),
      viewBottom = viewTop + $w.height(),
      _top = $t.offset().top,
      _bottom = _top + $t.height(),
      compareTop = partial === true ? _bottom : _top,
      compareBottom = partial === true ? _top : _bottom;
	return ((compareBottom <= viewBottom) && (compareTop >= viewTop));
};

//centered browser popup
window.$.centeredPopup = function(options) {
  var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left,
  dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top,
  width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width,
  height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height,
  left = ((width / 2) - (options.width / 2)) + dualScreenLeft,
  top = ((height / 2) - (options.height / 2)) + dualScreenTop,
  newWindow = window.open(options.url, options.title, 'scrollbars=yes, width='+options.width+', height='+options.height+', top=' + top + ', left=' + left);
  if (window.focus) { newWindow.focus(); }
};


//raf polyfill
(() => {
	var lastTime = 0;
	var vendors = ['ms', 'moz', 'webkit', 'o'];
	for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
	  window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
	  window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
	}
	if (!window.requestAnimationFrame)
    window.requestAnimationFrame = function(callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };
	if (!window.cancelAnimationFrame)
    window.cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };
})();


// jQuery throttle / debounce - v1.1 - 3/7/2010
// http://benalman.com/projects/jquery-throttle-debounce-plugin/
var $ = window.jQuery, jq_throttle;
$.throttle = jq_throttle = function( delay, no_trailing, callback, debounce_mode ) {
  var timeout_id,
    last_exec = 0;
  if ( typeof no_trailing !== 'boolean' ) {
    debounce_mode = callback;
    callback = no_trailing;
    no_trailing = undefined;
  }
  function wrapper() {
    var that = this,
      elapsed = +new Date() - last_exec,
      args = arguments;
    function exec() {
      last_exec = +new Date();
      callback.apply( that, args );
    };
    function clear() {
      timeout_id = undefined;
    };
    if ( debounce_mode && !timeout_id ) {
      exec();
    }
    timeout_id && clearTimeout( timeout_id );
    if ( debounce_mode === undefined && elapsed > delay ) {
      exec();
    } else if ( no_trailing !== true ) {
      timeout_id = setTimeout( debounce_mode ? clear : exec, debounce_mode === undefined ? delay - elapsed : delay );
    }
  };
  return wrapper;
};
$.debounce = function( delay, at_begin, callback ) {
  return callback === undefined
    ? jq_throttle( delay, at_begin, false )
    : jq_throttle( delay, callback, at_begin !== false );
};



//centered popup windows
$.centeredPopup = function(options) {
  var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left,
  dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top,
  width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width,
  height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height,
  left = ((width / 2) - (options.width / 2)) + dualScreenLeft,
  top = ((height / 2) - (options.height / 2)) + dualScreenTop,
  newWindow = window.open(options.url, options.title, 'scrollbars=yes, width='+options.width+', height='+options.height+', top=' + top + ', left=' + left);
  if (window.focus) { newWindow.focus(); }
};