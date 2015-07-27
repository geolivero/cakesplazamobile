var args = arguments[0] || {},
  closeWindow;

exports.setTitle = function (title) {
  $.titleBar.text = title;
};

exports.cleanUp = function () {
  if (OS_IOS) {
    if (closeWindow) {
      $.backBtn.removeEventListener('click', closeWindow);
      $.titleBar.removeEventListener('click', closeWindow);
      closeWindow = null;
    }
  }
};

exports.backButton = function (callback) {
  var cb = callback || function () { return; };
  if (OS_IOS) {
    closeWindow = function (e) {
      cb(e);
    };
    $.backBtn.addEventListener('click', closeWindow);
    $.titleBar.addEventListener('click', closeWindow);
  }    
};

exports.hidden = function () {
  $.titleBar.visible = false;
  if ($.backBtn) {
    $.backBtn.visible = false;  
  }
};