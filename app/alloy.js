var scrW = Ti.Platform.displayCaps.platformWidth,
  scrH = Ti.Platform.displayCaps.platformHeight;

Alloy.Globals.baseURL = 'http://cakesplaza.com/nl/';
Alloy.Globals.Helpers = require('helpers');
Alloy.Globals.styles = {
  color: {
    oDark: '#D9171313',
    lightPink: '#FFE2E2',
    darkBrown: '#1B1616',
    sDarkBrown: '#423535'
  },
  box: {
    wWidth: OS_ANDROID ? (scrW / (Ti.Platform.displayCaps.dpi / 160)) : scrW,
    wHeight: OS_ANDROID ? (scrH / (Ti.Platform.displayCaps.dpi / 160)) : scrH,
    mHeight: function (min) {
      return (Alloy.Globals.styles.box.wHeight + min) + 'dp';
    },
    mWidth: function (min) {
      return (Alloy.Globals.styles.box.wWidth + min) + 'dp';
    }
  }
};

Alloy.Globals.styles.top = OS_IOS ? 20 : 0;
Alloy.Globals.styles.topPos = OS_IOS ? '-' + Alloy.Globals.styles.top + 'dp' : 0;

Alloy.Globals.styles.box.height = Alloy.Globals.styles.box.mHeight(0);
Alloy.Globals.styles.box.width = Alloy.Globals.styles.box.mWidth(0);
Alloy.Globals.styles.box.heightBoxBaker = Alloy.Globals.styles.box.mWidth(95);
Alloy.Globals.styles.box.height100min = Alloy.Globals.styles.box.mHeight(-100);
Alloy.Globals.styles.box.height570height100min = Alloy.Globals.styles.box.mHeight(435);


