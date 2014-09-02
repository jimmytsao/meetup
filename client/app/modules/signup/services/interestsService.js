'use strict';

(function(){

  var SignupInterests = function(Restangular){
    this.getInterests = function(){
      return Restangular.all('signup/interests')
      .getList();
    };
  };

  angular
    .module('app.signup.services.interest', [])
    .service('SignupInterests', ['Restangular', SignupInterests]);
})();