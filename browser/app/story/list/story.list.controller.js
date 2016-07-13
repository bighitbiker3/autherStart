'use strict';

app.controller('StoryListCtrl', function ($rootScope, $scope, stories, Story, users) {
  $scope.stories = stories;
  $scope.users = users;

  $scope.newStory = new Story();

  $scope.currentUser = function(){
    return $rootScope.currentUser;
  }
  
  $scope.removeStory = function (story) {
    story.destroy()
    .then(function () {
      var idx = $scope.stories.indexOf(story);
      $scope.stories.splice(idx, 1);
    });
  };

  $scope.addStory = function () {
    $scope.newStory.save()
    .then(function (created) {
      // created.author = $scope.newStory.author;
      $scope.newStory = new Story();
      $scope.stories.unshift(created);
    });
  };
});
