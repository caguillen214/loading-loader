module.exports = function(attrs) {
  return attrs['ng-app'] ? attrs['ng-app'].value : undefined;
};
