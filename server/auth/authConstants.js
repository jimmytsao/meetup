'use strict';

console.log('outside', !process.env);
if (!process.env.isProduction){
  console.log('here');
  var fbConstants = require('../config/devConstants.js').fbConstants;
  var jwtConstants = require('../config/devConstants.js').jwtConstants;
}


console.log('fb constants', fbConstants);
module.exports.fb = {
  clientId: process.env.fbClientId || fbConstants.clientId,
  redirectUri: process.env.fbRedirectUri || fbConstants.redirectUri, 
  clientSecret: process.env.fbClientSecret|| fbConstants.clientSecret,
  tokenUrl: process.env.tokenUrl || fbConstants.tokenUrl
};

module.exports.jwt = {
  secret: process.env.jwtSecret || jwtConstants.secret,
  expirationInMinutes: process.env.jwtExpiration || jwtConstants.expirationInMinutes
};

