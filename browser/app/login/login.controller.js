
app.controller("LoginCtrl", function($rootScope, $scope, LoginFactory, $state, UserFactory){

	$scope.loginUser = function(){
		LoginFactory.loginUser($scope.user)
		.then(function(data){
			console.log(data);
			$rootScope.currentUser = UserFactory.getUser(data)
			$state.go("stories");
		})
		.catch(console.error.bind(console));
	}
})
