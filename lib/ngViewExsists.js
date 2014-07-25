var inAttrsOrClasses = require('./inAttrsOrClasses');

module.exports = function() {
  var doms = Array.prototype.slice.call(document.getElementsByTagName('*'));
  return doms.some(function(elem) {
    var isElemName = elem.nodeName.toLowerCase() === 'ng-view';
    var isInAttrsOrClasses = inAttrsOrClasses(elem.attributes);
    return isElemName || isInAttrsOrClasses;
  });
};
