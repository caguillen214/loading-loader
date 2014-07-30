var getModule = require('./getModule');
var getSuggestion = require('./getSuggestion');

module.exports = function(loadedModules) {
  var undeclaredModules = [];
  for( var module in loadedModules) {
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
