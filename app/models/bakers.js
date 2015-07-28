/*globals Alloy:true*/
exports.definition = {
  config: {
    URL: Alloy.Globals.baseURL + 'search/advanced-search',
    debug: false,
    timeout: 150000,
    idAttribute: 'uid',
    adapter: {
      type: 'restapi',
      collection_name: 'bakers',
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
    _.extend(Collection.prototype, {
      getUsersHome: function (collection, context) {
        var theRoles = [];
        _.map(this.models, function (model) {
          var roles = _.pluck(model.get('roles'), 'rid');
          if (roles.indexOf('9') > 0) {
            theRoles.push(model);
          }
        });

        return theRoles;
      }
    });
    return Collection;
  }
};