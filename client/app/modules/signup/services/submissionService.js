'use strict';

(function(){

  var SignupSubmission = function(Restangular, $state){

    var parseInterests = function(interests){
      var isSelectedInterest = function(item){
        if(item.selected === true){
          return true;
        }
      };
      return _.pluck(_.filter(interests, isSelectedInterest), 'interests_pk');
    };

    this.submit = function(interests, bio){
      return Restangular.all('signup/')
      .post({interests: parseInterests(interests), bio: bio})
      .then(function(){
        $state.go('main.dashboard');
      })
      .catch(function(){
        $state.go('login');
      });
    };
  };

  angular
    .module('app.signup.services.submission', [])
    .service('SignupSubmission', ['Restangular', '$state', SignupSubmission]);
})();