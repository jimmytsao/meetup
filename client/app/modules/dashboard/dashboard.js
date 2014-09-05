'use strict';

(function(){

  var dashboardRoutesConfig = function($stateProvider){
    $stateProvider
      .state('main.dashboard', {
        url: '/dashboard',
        templateUrl: 'dashboard/dashboardTemplate.html',
        controller: 'DashboardController as DashboardController',
        resolve: {
          userInterests: function (DashboardInterests){
            return DashboardInterests.getInterests();
          }
        }
      });
  };

  angular
    .module('app.main.dashboard', [
      'app.main.dashboard.controllers',
      'app.main.dashboard.services.dashboardInterests'])
    .config(['$stateProvider', dashboardRoutesConfig]);

  require('./dashboardControllers.js');

  require('./services/dashboardInterestsService.js');
})();