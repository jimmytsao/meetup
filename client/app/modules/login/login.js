'use strict';

(function(){

  var loginRoutesConfig = function($stateProvider){
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'login/loginTemplate.html',
        controller: 'LoginController as LoginController'
      });

      console.log('login config block');
  };

  var loginRunBlock = function($log){
    $log.info('login run block1');
  };

  var loginRunBlock2 = function($log){
    $log.info('login run block2');
  };

  angular
    .module('app.login', [
      'app.login.authValues',
      'app.login.facebookAuthService',
      'app.login.controllers'])
    .config(['$stateProvider', loginRoutesConfig])
    .run(['$log', '$ionicPlatform', loginRunBlock])
    .run(['$log', loginRunBlock2]);
  
  require('./loginAuthValues.js');
  require('./loginFacebookAuthService.js');
  require('./loginControllers.js');

})();
