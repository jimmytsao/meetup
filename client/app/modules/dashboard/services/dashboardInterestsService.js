'use strict';

(function(){

  var dashboardInterests = function(Restangular){
    this.getInterests = function(){
      return Restangular.all('dashboard')
      .getList();
    };
  };

  angular
    .module('app.main.dashboard.services.dashboardInterests', [])
    .service('DashboardInterests', ['Restangular', dashboardInterests]);
})();