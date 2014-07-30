var levenshteinDistance = require('./levenshtein');
var areSimilarEnough = require('./areSimilarEnough');
var modData = require('./moduleData');

module.exports = function(module){
  var min_levDist = Infinity,
      closestMatch = '';
  for(var createdModule in modData.createdModules) {
    if(areSimilarEnough(createdModule, module)) {
      var currentlevDist = levenshteinDistance(module, createdModule);
      if(currentlevDist < 5) {
        closestMatch = (currentlevDist < min_levDist)? createdModule : closestMatch;
        min_levDist = (currentlevDist < min_levDist)? currentlevDist : min_levDist;
      }
    }
  }
  return closestMatch;
};
