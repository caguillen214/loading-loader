var modData = require('./moduleData');

module.exports = function() {
  var multiLoaded = [];
  for(var modName in modData.createdMulti) {
    var message = 'Multiple modules with name "'+modName+'" are being created and they will overwrite each other.';
    var multi = modData.createdMulti[modName];
    var details = {
      existingModule: multi[multi.length - 1],
      overwrittenModules: multi.slice(0,multi.length-1)
    };
    multiLoaded.push({module:details, message:message});
  }
  return multiLoaded;
};
