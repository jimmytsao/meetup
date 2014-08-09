"use strict";

var chai = require('chai');

chai.config.includeStack = true;
global.expect = chai.expect;
global.AssertionError = chai.AssertionError;
global.Assertion = chai.Assertion;
global.assert = chai.assert;

describe('Sample Mocha Test', function () {
  it('Sample Test 1', function () {
    expect(1).equal(1);
  });
});

//Example Super Test
// var app = require('../../../app.js');
// var supertest =  require('supertest');
// var api = supertest(app);

// describe('Sample Super Test', function () {
//   it('Records sent back should be before the date requested', function (done) {
//     api.get('/newsfeed')
//     .query({date: '"2014-06-10T23:06:47.613Z"', records: 50})
//     .end(function(err, res){
//       var date = new Date("2014-06-10T23:06:47.613Z");
//       var firstReturned = res.body[0];
//       var returnedDate = new Date(firstReturned.createdAt);
//       expect(date > returnedDate).equal(true);
//       done();
//     });
//   });
// });


