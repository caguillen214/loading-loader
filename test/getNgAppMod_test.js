var getNgAppMod = require('../lib/getNgAppMod');

describe('getNgAppMod()', function() {
  it('should return the value of the ng-app attribute', function() {
    var attributes = {
        'width': {value: '10px'},
        'id': {value: 'idName'},
        'ng-app': {value: 'testModule'}
    };
    var res = getNgAppMod(attributes);
    expect(res).toBe('testModule');
  });
});