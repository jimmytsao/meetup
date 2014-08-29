'use strict';

(function(){

  var SignupController = function(fbAuth){
    console.log('signup controller');
    console.log('auth ', fbAuth.fbProfileInfo());
    this.fbProfileInfo = fbAuth.fbProfileInfo();
  };

  angular
    .module('app.signup.controllers', [])
    .controller('SignupController', ['fbAuth', SignupController]);

})();