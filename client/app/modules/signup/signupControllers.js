'use strict';

(function(){

  var SignupController = function(){
    console.log('Signup Controller');
  };

  angular
    .module('app.signup.controllers', [])
    .controller('SignupController', [SignupController]);

})();