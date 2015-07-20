function init () {
  $.theHome.init();
}

if (typeof exports !== 'undefined') {
  // useful variable to check if we are
  // in TiShadow
  Ti.App.TiShadow = true;

  exports.close = function() {
    window.close();
  };
}
if (OS_IOS) {
  $.index.open();
} else {
  $.index.open({
    activityEnterAnimation: Ti.Android.R.anim.slide_in_left,
    activityExitAnimation: Ti.Android.R.anim.slide_out_right
  });
}

//$.index.addEventListener('open', init);
//

init();