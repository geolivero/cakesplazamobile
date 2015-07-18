/*globals Alloy:true*/
exports.definition = {
  config: {
    URL: Alloy.Globals.baseURL + 'cpapp/bizzclient',
    debug: false,
    timeout: 150000,
    idAttribute: 'cpid',
    adapter: {
      type: 'restapi',
      idAttribute: 'cpid',
      collection_name: 'quote'
    },
    headers: {}
  },
  extendModel: function(Model) {
    var self = this,
      currentURL = self.config.URL;
    _.extend(Model.prototype, {
      url: function() {
        return self.config.URL;
      },
      setToken: function(token) {
        self.config.headers['X-CSRF-Token'] = token;
      },
      setURL: function(type) {
        self.config.URL = currentURL + type;
      },
      getURL: function() {
        return self.config.URL;
      }
    });
    return Model;
  },
  extendCollection: function(Collection) {

    _.extend(Collection.prototype, {
      initialize: function() {
        //*** Default sort field.  Replace with your own default.
        this.sortField = "cpid";
        //*** Default sort direction
        this.sortDirection = "ASC";
      },

      //*** Use setSortField to specify field and direction before calling sort method
      setSortField: function(field, direction) {
        this.sortField = field;
        this.sortDirection = direction;
      },

      comparator: function(collection) {
        return collection.get(this.sortField);
      },

      //*** Override sortBy to allow sort on any field, either direction 
      sortBy: function(iterator, context) {
        var obj = this.models;
        var direction = this.sortDirection;

        return _.pluck(_.map(obj, function(value, index, list) {
          return {
            value: value,
            index: index,
            criteria: iterator.call(context, value, index, list)
          };
        }).sort(function(left, right) {
          // swap a and b for reverse sort
          var a = direction === "ASC" ? left.criteria : right.criteria;
          var b = direction === "ASC" ? right.criteria : left.criteria;

          if (a !== b) {
            if (a > b || a === void 0) return 1;
            if (a < b || b === void 0) return -1;
          }
          return left.index < right.index ? -1 : 1;
        }), 'value');
      }
    });

    return Collection;
  }
};