'use strict';

(function(){

  var loginRoutesConfig = function($stateProvider){
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'login/loginTemplate.html',
        controller: 'LoginController as LoginController'
      });
  };

  angular
    .module('app.login', [
      'app.login.authValues',
      'app.login.facebookAuthService',
      'app.login.controllers'])
    .config(['$stateProvider', loginRoutesConfig]);
  
  require('./loginAuthValues.js');
  require('./loginFacebookAuthService.js');
  require('./loginControllers.js');

})();
