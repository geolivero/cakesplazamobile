var args = arguments[0] || {};


function openBakersProfile (e) {
  var Baker,
    onReady,
    slideToLeft,
    model,
    slideToRight;

  model = Alloy.Collections.bakers.get(0);
  console.log(typeof model, e.rowData.uid);
  Baker = Alloy.createController('bakers/profile', {
    prevController: 'home'
  })

  if (OS_IOS) {
    var slideToLeft = Titanium.UI.createAnimation();
    slideToLeft.left = 0;
    slideToLeft.duration = 300;
    Baker.init();
    Baker.getView().left = Alloy.Globals.styles.box.width;
    Baker.getView().open(slideToLeft);

    onReady = function () {
      $.parentController.getView().close();
      slideToLeft.removeEventListener('complete', onReady);
      slideToLeft = null;
    };
    
    slideToLeft.addEventListener('complete', onReady);

    slideToRight = Ti.UI.createAnimation();
    slideToRight.left = (Alloy.Globals.styles.box.wWidth * -1) + 'dp';
    slideToRight.duration = 300;
    $.parentController.getView().animate(slideToRight);

    slideToRight = null;

  } else {
    Baker.getView().open({
      activityEnterAnimation: Ti.Android.R.anim.slide_in_left,
      activityExitAnimation: Ti.Android.R.anim.fade_out
    });
  }
}

function dataTransform(model) {
  var transform = model.toJSON();
  transform.bizzName = transform.field_bedrijfsnaam_value || transform.field_naam_value;
  transform.bizzName = transform.bizzName.toUpperCase();
  transform.logo = transform.logo ? transform.logo.split('?')[0] : '';
  transform.isLogo = transform.logo ? '' : 'no_logo';
  return transform;
}

function dataFilter(collection) {
  var theRoles = [];

  collection.each(function(model) {
    var roles = _.pluck(model.get('roles'), 'rid');
    if (roles.indexOf('9') > 0) {
      theRoles.push(model);
    }
  });

  return theRoles;
}

function onScroll(e) {
  var height = 0,
    nHeight = 0,
    matrix2d,
    timer1,
    a,
    ratio = 0;

  if (e.y < 0) {

    matrix2d = Ti.UI.create2DMatrix();
    height = Alloy.Globals.styles.box.wHeight + e.y;
    ratio = Alloy.Globals.styles.box.wHeight / height;

    matrix2d = matrix2d.scale(ratio);
    a = Ti.UI.createAnimation({
      transform: matrix2d,
      duration: 100
    });

    $.firstPanel.animate(a);


  } else if (e.y > 0 && e.y < Alloy.Globals.styles.box.wHeight) {

    matrix2d = Ti.UI.create2DMatrix();
    matrix2d = matrix2d.translate(0, (e.y / 5));
    a = Ti.UI.createAnimation({
      transform: matrix2d,
      duration: 100
    });

    $.firstPanel.animate(a);


    matrix2d = Ti.UI.create2DMatrix();
    matrix2d = matrix2d.translate(0, (e.y / 7));
    a = Ti.UI.createAnimation({
      transform: matrix2d,
      duration: 100
    });
    
    $.logo.animate(a);
  }
}

function cleanUp() {
  $.destroy();
  $.home.removeEventListener('scroll', onScroll);
  $.bestBakers.removeEventListener('click', openBakersProfile);
}

function events() {
  $.home.addEventListener('scroll', onScroll);
}


function fetchCollection() {
  Alloy.Globals.Helpers.getCollection('bakers', function() {
    var collection = Alloy.Collections.bakers.getUsersHome();
    if (OS_ANDROID) {
      $.bestBakers.height = (collection.length * Alloy.Globals.styles.box.heightBoxBaker.replace('dp', '')) + 'dp';
    }
  });
}

function addElements() {
  var arrow = Alloy.createController('widget/arrow', {
    top: Alloy.Globals.styles.box.wHeight - 130
  });
  arrow.start();
  $.home.add(arrow.getView());
}

exports.cleanUp = cleanUp;

exports.init = function() {
  addElements();
  if (!Alloy.Collections.bakers.length) {
    fetchCollection();
  } else {
    Alloy.Collections.bakers.trigger('fetch');
  }
  
  events();
};