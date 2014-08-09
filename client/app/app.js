(function(){
'use strict';

var angular = require('angular');
angular
	.module('app', [])
	.config()
	.run();

//load template cache
require('./templateCache.js');

})();