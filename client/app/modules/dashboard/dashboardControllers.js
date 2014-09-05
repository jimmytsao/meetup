'use strict';

(function(){

  var DashboardController = function(Restangular, userInterests){
    this.userInterests = userInterests;
  };

  angular
    .module('app.main.dashboard.controllers',[])
    .controller('DashboardController', ['Restangular', 'userInterests', DashboardController]);
    
})();