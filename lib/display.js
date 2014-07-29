var hintLog = angular.hint = require('angular-hint-log');

module.exports = function(unusedModules) {
  unusedModules.forEach(function(module) {
    hintLog.logMessage('##Modules## ' + module.message);
  });
};
