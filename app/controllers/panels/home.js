var args = arguments[0] || {},
  arrow = Alloy.createController('widget/arrow', { 
    top: Alloy.Globals.styles.box.wHeight - 130 
  });

$.home.addEventListener('scroll', function (e) {
  var height = 0,
    nHeight = 0,
    matrix2d,
    a,
    ratio = 0;

  if (e.y < 0) {

    matrix2d = Ti.UI.create2DMatrix();
    height = Alloy.Globals.styles.box.wHeight  + e.y;
    ratio = Alloy.Globals.styles.box.wHeight / height;

    matrix2d = matrix2d.scale(ratio);
    a = Ti.UI.createAnimation({
      transform: matrix2d,
      duration: 200
    });
    $.firstPanel.animate(a);

  } else {
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
});

$.home.add(arrow.getView());