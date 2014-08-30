'use strict';

(function(){

  var facebookAuthService = function(facebookParams, $window, $q, Restangular, $state){

    var isCordovaDevice = false;
    var loginUrlWithParameters = facebookParams.loginUrl + '?client_id=' + facebookParams.appId + '&display=popup' + '&scope=user_photos' + '&redirect_uri=';
    var newBrowserWindow;
    var deferred;

    document.addEventListener("deviceready", function () {
      isCordovaDevice = true;
      console.log('deviceready');
    }, false);

    if (isCordovaDevice){
      loginUrlWithParameters = loginUrlWithParameters + facebookParams.oauthRedirectUrl;
    } else {
      loginUrlWithParameters = loginUrlWithParameters + facebookParams.oauthRedirectUrlNonCordova;
    }

    $window._app.oauthCallback = function (url) {
      deferred.resolve(url);
    };
    
    this.login = function(){
      deferred = $q.defer();
      newBrowserWindow = $window.open(loginUrlWithParameters, '_blank', 'location=no');
      return deferred.promise;
    };


    this.sendAuthCode = function(url){
      var code = url.split('code=')[1];

      return Restangular.all('auth/fb')
        .post({code: code})
        .then(function(data){
          console.log('data ', data);
          $window.localStorage.jwt = data.token;
          $window.localStorage.firstName = data.fbProfileInfo.first_name;

          //REMOVE WHEN NOT IN USE
          profileInfo = data.fbProfileInfo;

          //If new user - Go to signup
          if(data.isNewUser){
            $state.go('signup.interests');
          } else {
            $state.go('main.dashboard');
          }
        })
        .catch(function(error){
          console.log('Failed to convert access code to Token: ', error);
        });
    };

    //REMOVE WHEN NOT IN USE
    var profileInfo;
    this.fbProfileInfo = function(){return profileInfo;};
  };

  angular
    .module('app.login.facebookAuthService', [])
    .service('fbAuth', ['facebookParams', '$window', '$q', 'Restangular','$state', facebookAuthService]);

})();

