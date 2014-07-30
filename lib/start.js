var display = require('./display');
var formatMultiLoaded = require('./formatMultiLoaded');
var getUnusedModules = require('./getUnusedModules');
var getUndeclaredModules = require('./getUndeclaredModules');
var modData = require('./moduleData');
var ngViewNoNgRoute = require('./ngViewNoNgRoute');

module.exports = function() {
  var unusedModules = getUnusedModules(modData.createdModules);
  var undeclaredModules = getUndeclaredModules(modData.loadedModules);
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
