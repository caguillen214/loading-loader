module.exports = function(module) {
  module.requires.forEach(function(dependency){
    modData.loadedModules[dependency] = dependency;
  });
  modData.loadedModules[module.name] = module.name;
};
