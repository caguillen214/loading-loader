var getModule = require('../lib/getModule');

describe('getModule()', function() {
  it('should return the correct module', function() {
    var CREATED = true, LOADED = false;
    angular.module('testLoaded', []);
    angular.module('testCreated', ['testLoaded']);
    var res1 = getModule('testCreated', CREATED);
    var res2 = getModule('testLoaded', LOADED);
    var res3 = getModule('testCreated', LOADED);
    expect(res1.name).toBe('testCreated');
    expect(res2).toBe('testLoaded');
    expect(res3).toBe('testCreated');
  });
});