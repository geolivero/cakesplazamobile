exports.getCollection = function (colName, cb) {
  var callback = cb || function () { return; },
    collectionName = colName || 'bakers';
  if (!Alloy.Collections[collectionName].length) {
    Alloy.Collections[collectionName].fetch({
      success: function (content) {
        callback({
          success: true
        });
      },
      error: function (error) {
        callback({
          success: false,
          data: error
        });
        console.log('Sorry could not fetch at this time.');
      }
    })
  } else {
    callback({
     success: true
    });
  }
};