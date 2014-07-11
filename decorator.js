angular.module('ngHintLoader', []);
llLib.originalAngularModule = angular.module;
angular.module = function() {
  var module = llLib.originalAngularModule.apply(this,arguments);
  if(module.requires.length) {
    llLib.storeDependencies(module);
  }
  llLib.createdModules[module.name] = module;
  return module;
};
window.name = 'NG_DEFER_BOOTSTRAP!';
angular.element(document).ready(function() {
  llLib.start();
});
