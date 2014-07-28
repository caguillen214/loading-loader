var getUnusedModules = require('../lib/getUnusedModules');

describe('getUnusedModules()', function() {
  it('should get unused modules', function() {
    angular.module('iAmUnused',[]);
    angular.module('testModule',[]);
    var res = getUnusedModules();
    expect(res[0].module.name).toBe('iAmUnused');
  });
  it('should get ignore used modules', function() {
    angular.module('thisDoesexist',[]);
    angular.module('testModule',['thisDoesexist']);
    var res = getUnusedModules();
    expect(res.length).toBe(1);
  });
});