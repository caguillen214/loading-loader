'use strict';

angular.module('ngHintModules', []);
llLib.originalAngularModule = angular.module;
angular.module = function() {
  var module = llLib.originalAngularModule.apply(this,arguments);
  if(module.requires.length) {
    llLib.storeDependencies(module);
  }
  if(llLib.getModule(module.name,true)) {
    if(!llLib.createdMulti[module.name]) {
      llLib.createdMulti[module.name] = [llLib.getModule(module.name,true)];
    }
    llLib.createdMulti[module.name].push(module);
  }
  llLib.createdModules[module.name] = module;
  return module;
};
window.name = 'NG_DEFER_BOOTSTRAP!';
angular.element(document).ready(function() {
  llLib.start();
});
