var args = arguments[0] || {},
  stopAnim;

args.top = args.top || 10;

function startAnim() {
  if (stopAnim) {
    return;
  }
  $.arrow.animate({
    top: (args.top - 20) + 'dp',
    duration: 500
  }, function() {
    $.arrow.animate({
      top: args.top + 'dp',
      duration: 500
    }, startAnim);
  });

}

exports.stop = function() {
  stopAnim = true;
  $.arrow.animate({
    top: args.top + 'dp',
    duration: 0
  });
};

exports.start = function () {
  setTimeout(startAnim, 50);
};