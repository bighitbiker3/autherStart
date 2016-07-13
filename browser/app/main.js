'use strict';

var app = angular.module('auther', ['ui.router']);

app.config(function ($urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');
  $urlRouterProvider.when('/auth/:provider', function () {
  window.location.reload();
});
});

app.run(function($http, $rootScope){
  $http.get('/auth/me')
  .then(function(res){
    console.log('this is data', res)
    if(res.data){
      $rootScope.currentUser = res.data;
      console.log($rootScope);
    }
    else{
      console.log('user NOT logged in');
    }
  })
})
