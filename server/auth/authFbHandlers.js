'use strict';

var request = require('../common/helpers.js').request;
var fbConstants = require('./authConstants.js').fb;
var jwtConstants = require('./authConstants.js').jwt;
var User = require('../models/user.js');
var jwt = require('jsonwebtoken');

var fbTokenUrlGenerator = function(accessCode){
  return fbConstants.tokenUrl + '?client_id=' + fbConstants.clientId + '&redirect_uri=' + fbConstants.redirectUri + '&client_secret=' + fbConstants.clientSecret + '&code=' + accessCode;
};

var exchangeCodeForToken = function(accessCode){
  var fbTokenUrl = fbTokenUrlGenerator(accessCode);
  var parseToken = function(data){
    var token = data[1].split('=')[1].split('&expires')[0];
    return token;
  };
  return request(fbTokenUrl).then(parseToken);
};

var fetchUserFbProfile = function(token){
  var requestAuthHeader = 'Bearer '+token;
  var requestOptions = {
    url: 'https://graph.facebook.com/me',
    headers: {Authorization: requestAuthHeader }
  };
  var parseProfileData = function(data){
    var profileData = data[1];
    var parsedProfileData = JSON.parse(profileData);
    return parsedProfileData;
  };
  return request(requestOptions).then(parseProfileData);
};

var checkIfUserExists = function(profileData){
  var user = new User({facebookUserId: profileData.id});
  return user.fetch();
};

var updateUserProfile = function(userModel, fbProfileInfo, accessToken){
  return userModel.set({
    facebookAccessToken: accessToken,
    firstName: fbProfileInfo.first_name,
    lastName: fbProfileInfo.last_name,
    gender: fbProfileInfo.gender
  })
  .save()
  .then(function(){
    return userModel.get('users_pk');
  });

};

var createUserProfile = function(fbProfileInfo, accessToken){
  var userModel = new User({
    facebookUserId: fbProfileInfo.id,
    firstName: fbProfileInfo.first_name,
    lastName: fbProfileInfo.last_name,
    gender: fbProfileInfo.gender,
    facebookAccessToken: accessToken
  });

  return userModel
  .save()
  .then(function(){
    return userModel.get('users_pk');
  });

};

//TAKE OUT FBPROFILEINFO
var sendJWT = function(user_pk, res, fbProfileInfo){
  var payload = {id: user_pk};
  var token = jwt.sign(payload, jwtConstants.secret, {expiresInMinutes: jwtConstants.expirationInMinutes});

  //TAKE OUT FBPROFILEINFO
  res.status(200).send({token: token, fbProfileInfo: fbProfileInfo});
};


module.exports.fbLogin = function(req, res){

  var accessCode = req.body.code;
  var accessToken;
  var fbProfileInfo;

  exchangeCodeForToken(accessCode)

  .then(function(token){  
    accessToken = token;
    return token;
  })

  .then(fetchUserFbProfile)

  .then(function(profileData){
    fbProfileInfo = profileData;
    return profileData;
  })

  .then(checkIfUserExists)

  .then(function(userModel){
    var userExists = !!userModel;
    if (userExists){
      return updateUserProfile(userModel, fbProfileInfo, accessToken);
    } else {
      return createUserProfile(fbProfileInfo, accessToken);
    }
  })

  .then(function(user_pk){

    //TAKE OUT FBPROFILEINFO
    sendJWT(user_pk, res, fbProfileInfo);
  });
};