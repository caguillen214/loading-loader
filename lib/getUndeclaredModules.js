var getModule = require('./getModule');
var getSuggestion = require('./getSuggestion');
var modData = require('./moduleData');

module.exports = function() {
  var undeclaredModules = [];
  for( var module in modData.loadedModules) {
    var cModule = getModule(module, true);
    if(!cModule) {
      var match = getSuggestion(module);
      var suggestion = (match) ? '; Try: "'+match+'"' : '';
      var message = 'Module "'+module+'" was loaded but does not exist'+suggestion+'.';
      undeclaredModules.push({module:null, message:message});
    }
  }
  return undeclaredModules;
};
