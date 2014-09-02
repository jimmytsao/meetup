'use strict';

var Interests = require('../models/interests.js');

module.exports.sendInterests = function(req, res){
  Interests.fetchAll()
  .then(function(collection){
    return collection.mapThen(function(model){
      return {
        interests_pk : model.get('interests_pk'),
        interests_name: model.get('interests_name')
      };
    });
  })
  .then(function(collection){
    res.status(200).send(collection);
  });
};