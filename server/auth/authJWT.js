'use strict';

var jwt = require('jsonwebtoken');
var jwtConstants = require('./authConstants.js').jwt;

module.exports.jwtCheck = function(req, res, next){

  var token = req.headers['x-access-token'];
  var isValidToken;

  if (!!token){
    jwt.verify(token, jwtConstants.secret, function(err, decoded){

      isValidToken = !err && typeof decoded.id === 'number';

      if(isValidToken){
        req.userId = decoded.id;
        next();
        
      } else {
        res.status(401).send({routeToLogin: true});    
      }
    });

  } else {
    res.status(401).send({routeToLogin: true});
  }
};