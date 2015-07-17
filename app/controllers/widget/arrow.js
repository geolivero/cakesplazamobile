var args = arguments[0] || {};

args.top = args.top || 10;

console.log(args.top);
function startAnim () {
  $.arrow.animate({
    top: (args.top - 20) + 'dp',
    duration: 500
  }, function () {
    $.arrow.animate({
      top: args.top + 'dp',
      duration: 500
    }, startAnim);
  });
}

startAnim();

