describe('ll-lib', function() {
  describe('storeDependencies', function() {
    it('should store the dependencies of a module as loaded modules', function() {
      var fakeMod = {name: 'fakeMod', requires:['a','b']};
      llLib.createdModules['fakeMod'] = fakeMod;
      llLib.storeDependencies(fakeMod);
      expect(llLib.loadedModules['a']).toBe('a');
      expect(llLib.loadedModules['b']).toBe('b');
    })
  })
})