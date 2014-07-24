var levenshteinDistance = require('./levenshtein');
var areSimilarEnough = require('./areSimilarEnough');

module.exports = function(module){
  var min_levDist = Infinity, closestMatch = '';
  for(var createdModule in modData.createdModules) {
    if(areSimilarEnough(createdModule, module)) {
      var currentlevDist = levenshteinDistance(module, createdModule);
      closestMatch = (currentlevDist < min_levDist)? createdModule : closestMatch;
      min_levDist = (currentlevDist < min_levDist)? currentlevDist : min_levDist;
    }
  }
  return closestMatch;
};
