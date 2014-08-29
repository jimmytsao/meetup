'use strict';

(function(){

  var DashboardController = function(){
    this.hello = 'hello';
  };

  angular
    .module('app.main.dashboard.controllers',[])
    .controller('DashboardController', [DashboardController]);
    
})();