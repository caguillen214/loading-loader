var hintLog = require('angular-hint-log');

module.exports = function(unusedModules) {
  unusedModules.forEach(function(module){
    console.log(module.message)
    hintLog.logMessage(module.message);
  });
};
