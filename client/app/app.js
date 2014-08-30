'use strict';

(function(){

  //Global object for storing callback functions
  window._app = {};

  var defaultRouteConfig = function($urlRouterProvider){
    $urlRouterProvider.otherwise('/login');
  };

  var mainRunBlock = function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard for form inputs)
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  };

  var restangularConfig = function(Restangular, $window, $state){

    var jwtRequestInterceptor = function(element, operation, route, url, headers, params, httpConfig){
      var jwt = $window.localStorage.getItem('jwt');
      if (jwt){
        headers['x-access-token'] = jwt;
      }
      return {
        headers: headers
      };
    };

    var errorResponseInterceptor = function(response, deferred, responseHandler) {
      var isUnauthorized = response.status === 401;
      var routeToLogin = response.data ? response.data.routeToLogin : false;

      if (isUnauthorized && routeToLogin){
        console.log('Unauthorized, Error Response Interceptor: ', response);
        $state.go('login');
      }
    };

    Restangular.setErrorInterceptor(errorResponseInterceptor);
    Restangular.addFullRequestInterceptor(jwtRequestInterceptor);
  };

  angular
    .module('app', [
      'ionic',
      'restangular',
      'app.login',
      'app.signup',
      'app.main'])

    .config(['$urlRouterProvider', defaultRouteConfig])

    .run(['Restangular', '$window', '$state', restangularConfig])

    .run(['$ionicPlatform', mainRunBlock]);

  //app modules
  require('./modules/templateCache.js');
  require('./modules/login/login.js');
  require('./modules/signup/signup.js');
  require('./modules/main/main.js');

  //library modules
  window._ = require('lodash');
  require('restangular');

})();
