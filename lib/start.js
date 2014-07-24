var getUnusedModules = require('./getUnusedModules');
var getUndeclaredModules = require('./getUndeclaredModules');
var formatMultiLoaded = require('./formatMultiLoaded');
var display = require('./display');

module.exports = function() {
  var unusedModules = getUnusedModules();
  var undeclaredModules = getUndeclaredModules();
  var multiLoaded = formatMultiLoaded();
  if(unusedModules.length || undeclaredModules.length || multiLoaded.length) {
    display(unusedModules.concat(undeclaredModules).concat(multiLoaded));
  }
};
