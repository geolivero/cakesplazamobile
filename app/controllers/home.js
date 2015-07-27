var args = arguments[0] || {};
$.home.exitOnClose = true;

function init () {
  $.theHome.parentController = $;
  $.home.open();
  $.theToolbar.hidden();
}




$.home.addEventListener('close', function () {
  $.theHome.cleanUp();
  $.theToolbar.cleanUp();
});

exports.init = function () {
  init();
  $.theHome.init();
}