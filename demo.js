angular.module('createdAndLoaded',[]);
angular.module('createdAndLoaded',[]);
angular.module('loadedWithBadSpelling',[]);
angular.module('createdButNotLoaded',[]);
angular.module('testModule',
  ['ngHintModules','createdAndLoaded','loadedWithBdSpelling']);
