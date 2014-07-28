var ngViewexists = require('./ngViewexists');
var getModule = require('./getModule');

module.exports = function() {
  if(ngViewexists() && !getModule('ngRoute')) {
    return {message: 'Directive "ngView" was used in the application however "ngRoute" was not loaded into any module.'};
  }
};
