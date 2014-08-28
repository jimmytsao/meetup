'use strict';

(function(){
  angular
    .module('app.login.authValues',[])
    .value('facebookParams', {
      loginUrl: 'https://www.facebook.com/dialog/oauth',
      appId: 678308422257930,
      oauthRedirectUrl: 'http://localhost/#/auth/fb'
    });
})();