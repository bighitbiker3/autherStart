'use strict';

app.directive('navbar', function ($rootScope, $state, $location, LogOutFactory) {
  return {
    restrict: 'E',
    templateUrl: '/browser/components/navbar/navbar.html',
    link: function (scope) {
      scope.pathStartsWithStatePath = function (state) {
        var partial = $state.href(state);
        var path = $location.path();
        return path.startsWith(partial);
      };
      scope.logout = function(){
        LogOutFactory.logout()
        .then(function(res){
          $rootScope.currentUser = null;
          console.log(res);
        })
        .catch(console.error.bind(console));
      };
    }
  };
});
