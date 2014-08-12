(function(){
'use strict';

var angular = require('angular');
require('angular-ui-router');

angular
	.module('app', ['ui.router']);
	// .config()
	// .run();

//load template cache
require('./modules/templateCache.js');

})();