'use strict';

describe("My First Test", function(){

    it("should be true", function(){
        expect(true).toBe(true);
    });
});

// describe('Newsfeed Service Tests', function(){

//   var scope,
//       $httpBackend,
//       newsfeedService,
//       $document,
//       responseObject = [{
//         "storyId" : 10202304497459,
//         "projectId" : 10202304497443,
//         "studentName" : "Ruan Pethiyagoda",
//         "type" : "sysStory",
//         "text" : "added Avi Networks to HR Partner",
//         "companyName" : "Avi Networks",
//         "companyTaskId" : 10202304497458,
//         "createdAt" : "2014-02-11T20:38:16.830Z"}];

//   beforeEach(function(){
//     angular.mock.module('newsfeed.services');
//     inject(function(_$httpBackend_, _newsfeedService_, _$document_){
//       $httpBackend = _$httpBackend_;
//       newsfeedService = _newsfeedService_;
//       $document = _$document_;
//       $document.getElementById = function(){return this};
//       $document.remove=function(){return this};

//     });
    
//   });

//   // make sure no expectations were missed in your tests.
//   // (e.g. expectGET or expectPOST)
//   afterEach(function(){
//     $httpBackend.verifyNoOutstandingExpectation();
//     $httpBackend.verifyNoOutstandingRequest();
//   });


//   it('it should fetch new data once the scroll limit is reached', function(){

//     // Setting up the last date
//     $httpBackend.expectGET('/newsfeed?date=%222014-06-25T23:06:47.613Z%22&records=50').respond(responseObject);
    
//     spyOn(newsfeedService, 'fetchNewsfeedData').and.callThrough();

//     newsfeedService.fetchNewsfeedData(50, '2014-06-25T23:06:47.613Z');
//     $httpBackend.flush();

//     expect(newsfeedService.fetchNewsfeedData).toHaveBeenCalled();
//     expect(newsfeedService.lastDate).toBe("2014-02-11T20:38:16.830Z");

//     //test scroll
//     $httpBackend.expectGET('/newsfeed?date=%222014-02-11T20:38:16.830Z%22&records=50').respond(responseObject);

//     expect(newsfeedService.fired).toBe(false);

//     newsfeedService.scrollEventHandler.call({
//       scrollTop: 0.9, 
//       scrollHeight: 1,
//       appendChild: function(){}
//     });
    
//     expect(newsfeedService.fired).toBe(true);
    
//     $httpBackend.flush();

//     expect(newsfeedService.fired).toBe(false);
//     expect(newsfeedService.data.length).toBe(2);
//   });
// });



