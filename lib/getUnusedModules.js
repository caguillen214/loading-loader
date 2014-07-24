var getModule = require('./getModule');
var modData = require('./moduleData');

module.exports = function() {
  var unusedModules = [];
  for(var module in modData.createdModules) {
    if(!getModule(module)) {
      var cModule = getModule(module, true);
      var message = 'Module "'+cModule.name+'" was created but never loaded.';
      unusedModules.push({module:cModule, message:message});
    }
  }
  return unusedModules;
};
