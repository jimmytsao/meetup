'use strict';

(function(){

  var SignupController = function($window, SignupSubmission, interests){
    this.firstName = $window.localStorage.getItem('firstName');
    this.interests = interests;

    this.clearFilter = function(){
      this.interestsFilter = '';
    };

    this.submit = function(){
      SignupSubmission.submit(this.interests, this.bio);
    };
  };

  angular
    .module('app.signup.controllers', [])
    .controller('SignupController', ['$window', 'SignupSubmission', 'interests', SignupController]);

})();