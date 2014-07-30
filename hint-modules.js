'use strict';

var hintLog = angular.hint = require('angular-hint-log');
var storeDependencies = require('./lib/storeDependencies');
var getModule = require('./lib/getModule');
var start = require('./lib/start');
var storeNgAppAndView = require('./lib/storeNgAppAndView');
var storeUsedModules = require('./lib/storeUsedModules');
var modData = require('./lib/moduleData');

var doc = Array.prototype.slice.call(document.getElementsByTagName('*'));
var originalAngularModule = angular.module;
var modules = {};

storeNgAppAndView(doc);

angular.module = function() {
  var module = originalAngularModule.apply(this,arguments);
  var name = module.name;
  modules[name] = module;
  var modToCheck = getModule(module.name, true);
  if(modToCheck && modToCheck.requires.length && module.requires.length) {
    if(!modData.createdMulti[module.name]) {
      modData.createdMulti[module.name] = [getModule(module.name,true)];
    }
    modData.createdMulti[module.name].push(module);
  }
  modData.createdModules[module.name] = module;
  return module;
};

angular.module('ngHintModules', []).config(function() {
  var ngAppMod = modules[modData.ngAppMod];
  storeUsedModules(ngAppMod, modules);
  start();
});
