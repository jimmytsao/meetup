'use strict';

(function(){

  var SignupController = function($window, SignupInterests, interests){
    this.firstName = $window.localStorage.getItem('firstName');
    this.interests = interests;

    this.disp = function(){
      console.log('interests: ', this.bio, this.interests);
    };

    this.clearFilter = function(){
      this.interestsFilter = '';
    };
  };

  angular
    .module('app.signup.controllers', [])
    .controller('SignupController', ['$window', 'SignupInterests', 'interests', SignupController]);

})();