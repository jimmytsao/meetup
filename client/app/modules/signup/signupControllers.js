'use strict';

(function(){

  var SignupController = function(fbAuth, $window){
    this.firstName = $window.localStorage.getItem('firstName');
    this.fbProfileInfo = fbAuth.fbProfileInfo();
  };

  angular
    .module('app.signup.controllers', [])
    .controller('SignupController', ['fbAuth', '$window', SignupController]);

})();