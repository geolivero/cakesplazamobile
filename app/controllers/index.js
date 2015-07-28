var Home;
if (typeof exports !== 'undefined') {
  // useful variable to check if we are
  // in TiShadow
  Ti.App.TiShadow = true;

  exports.close = function() {
    window.close();
  };
}

Home = Alloy.createController('home');
Home.init();
Home.getView().open();
Home = null;