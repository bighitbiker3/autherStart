
app.controller("LoginCtrl", function($scope, LoginFactory, $state){

	$scope.loginUser = function(){
		// console.log($scope.user);
		LoginFactory.loginUser($scope.user)
		.then(function(data){
			console.log(data);
			$state.go("stories");
		})
		.catch(console.error.bind(console));
	}
})