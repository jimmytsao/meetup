'use strict';

(function(){


  var LoginController = function(fbAuth){
    console.log('Login Controller');

    this.signup = function(){
      console.log('this.signup clicked');
      fbAuth.login()
      .then(fbAuth.sendAuthCode);
    };

  };

  angular
    .module('app.login.controllers', [])
    .controller('LoginController', ['fbAuth', LoginController]);
})();