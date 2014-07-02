var llLib = {
  createdModules: {},
  loadedModules: {},
  originalAngularModule: {}
};

llLib.start = function() {
  var unusedModules = llLib.getUnusedModules();
  if(unusedModules.length) {
    llLib.display(unusedModules);
  }
}

llLib.getUnusedModules = function() {
  var unusedModules = [];
  for(var module in llLib.createdModules) {
    if(!llLib.getModule(module)) {
      unusedModules.push(llLib.createdModules[module]);
    }
  }
  return unusedModules;
};

llLib.display = function(unusedModules) {
  console.groupCollapsed('Angular Hint: Modules');
  unusedModules.forEach(function(module){
    console.groupCollapsed('Module "'+module.name+'" was created but never loaded.');
    console.log(module);
    console.groupEnd();
  });
  console.groupEnd();
};

llLib.storeDependencies = function(module) {
  module.requires.forEach(function(dependency){
    var moduleToAdd = {
      module: llLib.getModule(module.name, true),
      parent: module,
    }
    llLib.loadedModules[dependency] = moduleToAdd;
  });
};

llLib.getModule = function(moduleName, getCreated) {
    return (getCreated)? llLib.createdModules[moduleName] : llLib.loadedModules[moduleName];
};
