var args = arguments[0] || {};

function cleanUp () {
  $.btnBack.removeEventListener('click', goBack);
}

function goBack () {
  var prevController;
  $.login.close();

  if (OS_IOS) {
    prevController = Alloy.createController(args.prevController);
    prevController.init();
    prevController = null;
  }
}

exports.cleanUp = cleanUp;
$.login.addEventListener('close', cleanUp);