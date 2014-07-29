var hintLog = require('angular-hint-log');

module.exports = function(unusedModules) {
  unusedModules.forEach(function(module) {
    hintLog.logMessage(module.message);
  });
};
