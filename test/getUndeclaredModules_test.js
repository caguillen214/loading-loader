var getUndeclaredModules = require('../lib/getUndeclaredModules');

describe('getUndeclaredModules()', function() {
  it('should get undeclared modules', function() {
    angular.module('testModule',['thisDoesntEvenExsist']);
    var res = getUndeclaredModules();
    expect(res[0].message).toBe('Module "thisDoesntEvenExsist" was loaded but does not exsist.');
  });
  it('should get ignore declared modules', function() {
    angular.module('thisDoesExsist',[]);
    angular.module('testModule',['thisDoesExsist']);
    var res = getUndeclaredModules();
    expect(res.length).toBe(1);
  });
});