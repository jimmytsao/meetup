'use strict';
(function(){


  var signupRoutesConfig = function($stateProvider){
    $stateProvider
      .state('signup', {
        url: '/signup',
        templateUrl: 'signup/signupTemplate.html',
        controller: 'SignupController as SignupController'
      });
  };


  angular
    .module('app.signup', ['app.signup.controllers'])
    .config(['$stateProvider', signupRoutesConfig]);

  require('./signupControllers.js');

})();
