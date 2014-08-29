'use strict';

(function(){

  var LoginController = function(fbAuth){
    this.signup = function(){
      fbAuth.login()
      .then(fbAuth.sendAuthCode);
    };
  };

  angular
    .module('app.login.controllers', [])
    .controller('LoginController', ['fbAuth', LoginController]);
})();