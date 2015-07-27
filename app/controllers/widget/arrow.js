var args = arguments[0] || {},
  animUpDown,
  animReady,
  stopAnim;

args.top = args.top || 10;

function startAnim() {
  if (stopAnim) {
    return;
  }

  animReady = function () {
    animUpDown = Ti.UI.createAnimation();
    animUpDown.top = args.top + 'dp';
    animUpDown.duration = 500;
    $.arrow.animate(animUpDown);
    animUpDown.addEventListener('complete', startAnim);
  };

  animUpDown = Ti.UI.createAnimation();
  animUpDown.top = (args.top - 20) + 'dp';
  animUpDown.duration = 500;
  animUpDown.addEventListener('complete', animReady);
  $.arrow.animate(animUpDown);


}

exports.stop = function() {
  stopAnim = true;
  animUpDown = Ti.UI.createAnimation();
  animUpDown.top = args.top + 'dp';
  animUpDown.duration = 1;
  $.arrow.animate(animUpDown);
  if (animReady) {
    animUpDown.addEventListener('complete', animReady);
  } else {
    animUpDown.addEventListener('complete', startAnim);
  }
  animUpDown = null;
  stopAnim = null;
};

exports.start = function () {
  setTimeout(startAnim, 50);
};