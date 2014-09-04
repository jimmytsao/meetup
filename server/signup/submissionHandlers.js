'use strict';

var UsersInterestsMap = require('../models/users_interests_map.js');
var UsersProfiles = require('../models/users_profiles.js');
var Users = require('../models/users.js');
var promise = require('bluebird');

var createUsersInterestsCollection = function(array, id){
  var results = [];
  for (var i = 0; i<array.length; i++){
    results.push({
      users_pk: id,
      interests_pk: array[i]
    });
  }
  return results;
};

module.exports.processSubmission = function(req, res){

  var users_pk = req.userId;
  var promiseArray = [];

  var user = Users.forge({users_pk: users_pk});
  var usersInterestsCollection = UsersInterestsMap.collection(createUsersInterestsCollection(req.body.interests, users_pk));
  var userProfileBio = UsersProfiles.forge({
    users_pk: users_pk,
    users_bio: req.body.bio
  });

  promiseArray = promiseArray.concat(usersInterestsCollection.invoke('save'));
  promiseArray.push(userProfileBio.save());
  promiseArray.push(user.fetch().
    then(function(model){
      return model
        .set({completed_setup: true})
        .save();
    })
  );

  promise.all(promiseArray)
  .then(function(){
    res.status(201).send();
  });
};


