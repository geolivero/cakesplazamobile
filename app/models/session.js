/*globals Alloy:true*/
exports.definition = {
  config: {
    URL: Alloy.Globals.baseURL + 'cpapp/user_session',
    //"debug": 1,
    timeout: 150000,
    adapter: {
      type: 'restapi',
      collection_name: 'session',
    },
    headers: {}
    /*,
    headers: { // your custom headers
      Accept: 'application/vnd.stackmob+json; version=0',
      X-StackMob-API-Key: 'your-stackmob-key'
    }*/
  },
  extendModel: function (Model) {
  },
  extendCollection: function (Collection) {
    return Collection;
  }
};