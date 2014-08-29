'use strict';

(function(){

  var dashboardRoutesConfig = function($stateProvider){
    console.log('in dashboardconfig');
    $stateProvider
      .state('main.dashboard', {
        url: '/dashboard',
        templateUrl: 'dashboard/dashboardTemplate.html',
        controller: 'DashboardController as DashboardController'
      });
  };

  angular
    .module('app.main.dashboard', [
      'app.main.dashboard.controllers'])
    .config(['$stateProvider', dashboardRoutesConfig]);

  require('./dashboardControllers.js');
})();