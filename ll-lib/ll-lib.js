'use strict';
var llLib = {
  createdModules: {},
  createdMulti: {},
  loadedModules: {},
};

llLib.start = function() {
  var unusedModules = llLib.getUnusedModules();
  var undeclaredModules = llLib.getUndeclaredModules();
  var multiLoaded = llLib.formatMultiLoaded();
  if(unusedModules.length || undeclaredModules.length || multiLoaded.length) {
    llLib.display(unusedModules.concat(undeclaredModules).concat(multiLoaded));
  }
};

llLib.getUnusedModules = function() {
  var unusedModules = [];
  for(var module in llLib.createdModules) {
    if(!llLib.getModule(module)) {
      var cModule = llLib.getModule(module,true);
      var message = 'Module "'+cModule.name+'" was created but never loaded.';
      unusedModules.push({module:cModule, message:message});
    }
  }
  return unusedModules;
};

llLib.getUndeclaredModules = function() {
  var undeclaredModules = [];
  for( var module in llLib.loadedModules) {
    var cModule = llLib.getModule(module,true);
    if(!cModule) {
      var match = llLib.getSuggestion(module);
      var suggestion = (match) ? '; Try: "'+match+'"' : '';
      var message = 'Module "'+module+'" was loaded but does not exsist'+suggestion+'.';
      undeclaredModules.push({module:null, message:message});
    }
  }
  return undeclaredModules;
};

llLib.formatMultiLoaded = function() {
  var multiLoaded = [];
  for(var modName in llLib.createdMulti) {
    var message = 'Multiple modules with name "'+modName+'" are being created and they will overwrite each other.';
    var multi = llLib.createdMulti[modName];
    var details = {
      exsistingModule: multi[multi.length - 1],
      overwrittenModules: multi.slice(0,multi.length-1)
    };
    multiLoaded.push({module:details, message:message});
  }
  return multiLoaded;
};

llLib.display = function(unusedModules) {
  console.groupCollapsed('Angular Hint: Modules');
  unusedModules.forEach(function(module){
    console.groupCollapsed(module.message);
    if(module.module) {
      console.log(module.module);
    }
    console.groupEnd();
  });
  console.groupEnd();
};

llLib.storeDependencies = function(module) {
  module.requires.forEach(function(dependency){
    llLib.loadedModules[dependency] = dependency;
  });
  llLib.loadedModules[module.name] = module.name;
};

llLib.getModule = function(moduleName, getCreated) {
    return (getCreated)? llLib.createdModules[moduleName] : llLib.loadedModules[moduleName];
};

llLib.getSuggestion = function(module){
  var min_levDist = Infinity, closestMatch = '';
  for(var createdModule in llLib.createdModules) {
    if(llLib.areSimilarEnough(createdModule, module)) {
      var currentlevDist = llLib.levenshteinDistance(module, createdModule);
      closestMatch = (currentlevDist < min_levDist)? createdModule : closestMatch;
      min_levDist = (currentlevDist < min_levDist)? currentlevDist : min_levDist;
    }
  }
  return closestMatch;
};

llLib.areSimilarEnough = function(s,t) {
  var strMap = {}, similarities = 0, STRICTNESS = 0.66;
  if(Math.abs(s.length-t.length) > 3) {
    return false;
  }
  s.split('').forEach(function(x){strMap[x] = x;});
  for (var i = t.length - 1; i >= 0; i--) {
    similarities = strMap[t.charAt(i)] ? similarities + 1 : similarities;
  }
  return similarities >= t.length * STRICTNESS;
};

llLib.levenshteinDistance = function(s, t) {
    if(typeof s !== 'string' || typeof t !== 'string') {
      throw new Error('Function must be passed two strings, given: '+typeof s+' and '+typeof t+'.');
    }
    var d = [];
    var n = s.length;
    var m = t.length;

    if (n === 0) return m;
    if (m === 0) return n;

    for (var i = n; i >= 0; i--) d[i] = [];
    for (var i = n; i >= 0; i--) d[i][0] = i;
    for (var j = m; j >= 0; j--) d[0][j] = j;
    for (var i = 1; i <= n; i++) {
        var s_i = s.charAt(i - 1);

        for (var j = 1; j <= m; j++) {
            if (i == j && d[i][j] > 4) return n;
            var t_j = t.charAt(j - 1);
            var cost = (s_i == t_j) ? 0 : 1;
            var mi = d[i - 1][j] + 1;
            var b = d[i][j - 1] + 1;
            var c = d[i - 1][j - 1] + cost;
            if (b < mi) mi = b;
            if (c < mi) mi = c;
            d[i][j] = mi;
            if (i > 1 && j > 1 && s_i == t.charAt(j - 2) && s.charAt(i - 2) == t_j) {
                d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + cost);
            }
        }
    }
    return d[n][m];
};
