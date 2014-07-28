var getUndeclaredModules = require('../lib/getUndeclaredModules');

describe('getUndeclaredModules()', function() {
  it('should get undeclared modules', function() {
    angular.module('testModule',['thisDoesntEvenexist']);
    var res = getUndeclaredModules();
    expect(res[0].message).toBe('Module "thisDoesntEvenexist" was loaded but does not exist.');
  });
  it('should get ignore declared modules', function() {
    angular.module('thisDoesexist',[]);
    angular.module('testModule',['thisDoesexist']);
    var res = getUndeclaredModules();
    expect(res.length).toBe(1);
  });
});