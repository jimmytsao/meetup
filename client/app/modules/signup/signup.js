'use strict';
(function(){


  var signupRoutesConfig = function($stateProvider){
    $stateProvider
      .state('signup', {
        url: '/signup',
        templateUrl: 'signup/templates/signupTemplate.html',
        controller: 'SignupController as SignupController',
        abstract: true
      })
      .state('signup.interests', {
        url: '/interests',
        templateUrl: 'signup/templates/interestsTemplate.html'
      })
      .state('signup.profile', {
        url: '/profile',
        templateUrl: 'signup/templates/profileTemplate.html'
      })
      .state('signup.invite', {
        url: '/invite',
        templateUrl: 'signup/templates/inviteTemplate.html'
      });
  };


  angular
    .module('app.signup', [
      'app.signup.controllers',

      'app.signup.services.interest'])
    .config(['$stateProvider', signupRoutesConfig]);

  //Controllers
  require('./signupControllers.js');

  //Services
  require('./services/interestsService.js');
})();
