angular.module("app").run(["$templateCache", function($templateCache) {$templateCache.put("login/loginTemplate.html","<div class=\'login-container\'>\n  <div class=\'login-title\'>Meetup</div>\n  <div class=\'login-fb-login-button\' ng-click=\'LoginController.signup()\'>Login with Facebook</div>\n</div>\n");
$templateCache.put("signup/signupTemplate.html","<div>\n  Welcome!\n\n  This is your Facebook public profile information:\n\n  {{SignupController.fbProfileInfo}}\n</div>");}]);