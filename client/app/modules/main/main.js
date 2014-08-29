'use strict';

(function(){

  var mainRoutesConfig = function($stateProvider){
    $stateProvider
      .state('main', {
        url: '/main',
        templateUrl: 'main/mainTemplate.html',
        abstract: true
      });
  };

  angular
    .module('app.main',[
      'app.main.dashboard'])
    .config(['$stateProvider', mainRoutesConfig]);

  require('../dashboard/dashboard.js');
})();