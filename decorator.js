angular.module('ngHintLoader', []);
llLib.originalAngularModule = angular.module;
angular.module = function() {
  var module = llLib.originalAngularModule.apply(this,arguments);
  if(module.requires.length) { // if the module has dependencies
    llLib.storeDependencies(module); //store those dependencies as modules that have(will be) loaded
  }
  llLib.createdModules[module.name] = module; //store the module (demo, cal, calp2, etc) as ones that have ever been created
  return module;
};
window.name = 'NG_DEFER_BOOTSTRAP!';
angular.element(document).ready(function() {
  llLib.start();
  angular.resumeBootstrap();
});
