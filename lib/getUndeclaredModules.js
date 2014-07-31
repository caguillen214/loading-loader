var getModule = require('./getModule');
var dictionary = Object.keys(require('./moduleData').createdModules);
var suggest = require('suggest-it')(dictionary);

module.exports = function(loadedModules) {
  var undeclaredModules = [];
  for( var module in loadedModules) {
    var cModule = getModule(module, true);
    if(!cModule) {
      var match = suggest(module);
      var suggestion = (match) ? '; Try: "'+match+'"' : '';
      var message = 'Module "'+module+'" was loaded but does not exist'+suggestion+'.';
      undeclaredModules.push({module:null, message:message});
    }
  }
  return undeclaredModules;
};
