'use strict';

(function(){

  var facebookAuthService = function(facebookParams, $window, $q, Restangular){

    var isCordovaDevice        = false;
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
      console.log($window.test, 'test');
      deferred = $q.defer();
      newBrowserWindow = $window.open(loginUrlWithParameters, '_blank', 'location=no');
      return deferred.promise;
    };

    this.sendAuthCode = function(url){
      var code = url.split('code=')[1];
      console.log('code: ', code);
      Restangular.all('auth/fb')
        .post({code: code})
        .then(function(data){
          console.log('data ', data);
          $window.localStorage.jwt = data.token;

          console.log('jwt ', $window.localStorage.jwt);
        });
    };

    console.log('auth provider');
  };

  angular
    .module('app.login.facebookAuthService', [])
    .service('fbAuth', ['facebookParams', '$window', '$q', 'Restangular', facebookAuthService]);

})();

