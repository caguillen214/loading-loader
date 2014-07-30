var getModule = require('../lib/getModule');
var modData = require('../lib/moduleData');

describe('getModule()', function() {
  it('should return the correct module', function() {
    var CREATED = true, LOADED = false;
    modData.loadedModules['testLoaded'] = {name: 'testLoaded'};
    modData.createdModules['testCreated'] = {name: 'testCreated'};
    var res1 = getModule('testCreated', CREATED);
    var res2 = getModule('testLoaded', LOADED);
    expect(res1.name).toBe('testCreated');
    expect(res2.name).toBe('testLoaded');
  });
});