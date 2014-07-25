var getUnusedModules = require('./getUnusedModules');
var getUndeclaredModules = require('./getUndeclaredModules');
var formatMultiLoaded = require('./formatMultiLoaded');
var ngViewNoNgRoute = require('./ngViewNoNgRoute');
var display = require('./display');

module.exports = function() {
  var unusedModules = getUnusedModules();
  var undeclaredModules = getUndeclaredModules();
  var multiLoaded = formatMultiLoaded();
  var noNgRoute = ngViewNoNgRoute();
  if(unusedModules.length || undeclaredModules.length || multiLoaded.length || noNgRoute) {
    var toSend = unusedModules.concat(undeclaredModules)
      .concat(multiLoaded);
    if(noNgRoute) {
      toSend = toSend.concat(noNgRoute);
    }
    display(toSend);
  }
};
