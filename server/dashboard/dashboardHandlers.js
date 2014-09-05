'use strict';

var usersInterests = require('../models/users_interests_map.js');

module.exports.sendDashboardInterests = function(req, res){

  var users_pk = req.userId;
  var columns = ['users_interests_map.interests_pk', 'interests.interests_name'];

  usersInterests
    .collection()
    .query()
      .select(columns)
      .leftJoin('interests','users_interests_map.interests_pk', 'interests.interests_pk')
      .where({ 'users_interests_map.users_pk' : users_pk})
    .then(function(collection){
      res.status(200).send(collection);
    });
};



