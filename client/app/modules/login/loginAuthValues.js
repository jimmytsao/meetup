'use strict';

(function(){

  console.log('process.env.fbCallbackNonCordova: ', process.env.fbCallbackNonCordova);

  angular
    .module('app.login.authValues',[])
    .value('facebookParams', {
      loginUrl: 'https://www.facebook.com/dialog/oauth',
      appId: 678308422257930,
      oauthRedirectUrl: 'http://localhost/#/auth/fb',
      oauthRedirectUrlNonCordova: process.env.fbCallbackNonCordova || 'http://localhost:8000/oauthcallback.html'
    });
})();