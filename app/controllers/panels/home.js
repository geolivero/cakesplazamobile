var args = arguments[0] || {};


function openBakersProfile (e) {
  alert('loaded');
  var Baker = Alloy.createController('bakers/profile').getView();

  if (OS_IOS) {
    var slide_it_left = Titanium.UI.createAnimation();
    slide_it_left.left = 0;
    slide_it_left.duration = 300;
    Baker.left = 500;

    Baker.open();
  } else {
    Baker.open({
      activityEnterAnimation: Ti.Android.R.anim.slide_in_left,
      activityExitAnimation: Ti.Android.R.anim.slide_out_right
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
    /*timer1 = setTimeout(function() {
      clearTimeout(timer1);
      
    }, 50);*/
    $.firstPanel.animate(a);
    /*setTimeout(function() {
      $.firstPanel.animate(a);
    }, 50);*/


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
  $.home.removeEventListener('scroll', onScroll);
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
  fetchCollection();
  events();
};