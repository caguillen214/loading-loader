var hintLog = angular.hint;
var start = require('./lib/start');
var modData = require('./lib/moduleData');
describe('hintModules', function() {
  beforeEach(function() {
    modData.createdModules = {
      'createdAndNotLoaded': {name:'createdAndNotLoaded', requires: []},
      'testModule': {name:'createdAndNotLoaded', requires: []}
    }
    modData.loadedModules = {
      'doesntExist': 'doesntExist'
    }
    modData.createdMulti = {
      'testModule': 'testModule'
    }
  });
  it('should identify modules created and not loaded', function() {
    angular.module('createdAndNotLoaded', []);
    start();
    expect(Object.keys(hintLog.flush()['Modules'])[0]).toBe(' Module "createdAndNotLoaded" was created but never loaded.');
  });
  it('should identify modules loaded that do not exsist', function() {
    angular.module('testModule', ['doesntExist']);
    start();
    expect(Object.keys(hintLog.flush()['Modules'])[2]).toBe(' Module "doesntExist" was loaded but does not exist.');
  });
  it('should identify modules that have been loaded multiple times', function() {
    angular.module('testModule', []);
    start();
    expect(Object.keys(hintLog.flush()['Modules'])[3]).toBe(' Multiple modules with name "testModule" are being created and they will overwrite each other.');
  });
});