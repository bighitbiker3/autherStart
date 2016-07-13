'use strict';

app.controller('UserListCtrl', function ($rootScope, $scope, users, User) {
  $scope.users = users;
  $scope.addUser = function () {
    $scope.userAdd.save()
    .then(function (user) {
      $scope.userAdd = new User();
      $scope.users.unshift(user);
    });
  };
  $scope.currentUser = function(){
    console.log('rooscope cur user', $rootScope.currentUser)
    return $rootScope.currentUser;
  }

  $scope.userSearch = new User();

  $scope.userAdd = new User();
});
