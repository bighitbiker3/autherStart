'use strict';

app.controller('StoryDetailCtrl', function ($rootScope, $scope, story, users) {
  $scope.story = story;
  $scope.users = users;
  $scope.$watch('story', function () {
    $scope.story.save();
  }, true);

  $scope.currentUser = function(){
    console.log('rooscope cur user', $rootScope.currentUser)
    return $rootScope.currentUser;
  }

});
