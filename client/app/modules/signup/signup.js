'use strict';
(function(){


  var signupRoutesConfig = function($stateProvider){
    $stateProvider
      .state('signup', {
        url: '/signup',
        templateUrl: 'signup/signupTemplate.html',
        controller: 'SignupController as SignupController'
      });

      console.log('signup config block');
  };

  var signinRunBlock = function($log){
    $log.info('signin run block1');
  };

  var signinRunBlock2 = function($log){
    $log.info('signin run block2');
  };


  angular
    .module('app.signup', ['app.signup.controllers'])
    .config(['$stateProvider', signupRoutesConfig])
    .run(['$log', signinRunBlock])
    .run(['$log', signinRunBlock2]);
  
  require('./signupControllers.js');

})();
