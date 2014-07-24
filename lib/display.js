module.exports = function(unusedModules) {
  console.groupCollapsed('Angular Hint: Modules');
  unusedModules.forEach(function(module){
    console.groupCollapsed(module.message);
    if(module.module) {
      console.log(module.module);
    }
    console.groupEnd();
  });
  console.groupEnd();
};
