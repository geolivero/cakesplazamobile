/*globals Alloy:true*/
exports.definition = {
  config: {
    URL: Alloy.Globals.baseURL + 'cpapp/',
    //"debug": 1,
    timeout: 150000,
    idAttribute: 'uid',
    adapter: {
      type: 'restapi',
      collection_name: 'user',
      idAttribute: 'uid'
    },
    headers: {}
    /*,
    headers: { // your custom headers
      Accept: 'application/vnd.stackmob+json; version=0',
      X-StackMob-API-Key: 'your-stackmob-key'
    }*/
  },
  extendModel: function (Model) {
    var self = this,
      currentURL = self.config.URL;
    _.extend(Model.prototype, {
      url: function () {
        return self.config.URL;
      },
      setToken: function (token) {
        self.config.headers['X-CSRF-Token'] = token;
      },
      setURL: function (type) {
        self.config.URL = currentURL + type;
      },
      getURL: function () {
        return self.config.URL;
      }
    });
    return Model;
  },
  extendCollection: function (Collection) {
    _.extend(Collection.prototype, {});

    return Collection;
  }
};