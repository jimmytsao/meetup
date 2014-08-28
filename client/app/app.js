'use strict';

(function(){

  //Global object for storing callback functions
  window._app = {};

  var defaultRouteConfig = function($urlRouterProvider){
    $urlRouterProvider.otherwise('/signup');
    console.log('Main config block');
  };

  var mainRunBlock = function($ionicPlatform) {
    $ionicPlatform.ready(function() {

      console.log('main run block');
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  };


  angular
    .module('app', [
      'ionic',
      'app.login',
      'app.signup',
      'restangular'])

    .config(['$urlRouterProvider', defaultRouteConfig])
    .run(['$ionicPlatform', mainRunBlock]);

  //app modules
  require('./modules/templateCache.js');
  require('./modules/login/login.js');
  require('./modules/signup/signup.js');

  //library modules
  window._ = require('lodash');
  require('restangular');

})();
