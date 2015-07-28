var args = arguments[0] || {},
  slideToRight,
  slideToLeft,
  onReady,
  prevController;


function cleanUp () {
  $.theToolbar.cleanUp();
  slideToRight.removeEventListener('complete', onReady);
  $.profile.removeEventListener('swipe', swiper);
  slideToRight = slideToLeft = prevController = onReady = null;
}

function closeMe () {

  if (OS_IOS) {
    slideToRight = Ti.UI.createAnimation();
    slideToRight.left = Alloy.Globals.styles.box.width;
    slideToRight.duration = 400;

    onReady = function () {
      $.profile.close();
      slideToRight.removeEventListener('complete', onReady);
    };
    
    slideToRight.addEventListener('complete', onReady);
    $.profile.animate(slideToRight);


    
    slideToLeft = Ti.UI.createAnimation();
    slideToLeft.left = 0;
    slideToLeft.duration = 200;

    prevController = Alloy.createController(args.prevController);
    prevController.getView().left = (Alloy.Globals.styles.box.wWidth * -1) + 'dp';
    prevController.getView().animate(slideToLeft); 
    prevController.init();
    prevController = null;
    
  } else {
    $.profile.close(controller);
  }
}
function swiper (e) {
  if (e.direction === 'right') {
    closeMe();
  }
}

exports.cleanUp = cleanUp;

exports.init = function () {
  $.theToolbar.setTitle('My profile');
  $.theToolbar.backButton(closeMe);
  $.profile.addEventListener('swipe', swiper);
};

$.profile.addEventListener('close', cleanUp);