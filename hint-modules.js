'use strict';


var hintLog = angular.hint = require('angular-hint-log');
var storeDependencies = require('./lib/storeDependencies');
var getModule = require('./lib/getModule');
var start = require('./lib/start');
var storeNgAppAndView = require('./lib/storeNgAppAndView');
var modData = require('./lib/moduleData');

var originalAngularModule = angular.module;


angular.module = function() {
  var module = originalAngularModule.apply(this,arguments);
  //store ngApp Module & check for ngView
  storeNgAppAndView();

  //if module has dependencies
  if(module.requires.length) {
    storeDependencies(module);
  }

  //if module already exsists
  if(getModule(module.name, true)) {
    if(!modData.createdMulti[module.name]) {
      modData.createdMulti[module.name] = [getModule(module.name,true)];
    }
    modData.createdMulti[module.name].push(module);
  }
  modData.createdModules[module.name] = module;
  return module;
};

angular.module('ngHintModules', []).config(function() {
  start();
});
