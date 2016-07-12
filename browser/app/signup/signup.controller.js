
app.controller("SignupCtrl", function($scope, SignupFactory, $state){

	$scope.signup = function(){
		console.log("clicked");
		SignupFactory.signup($scope.user)
		.then(function(data){
			console.log(data);
			$state.go("stories");
		})
		.catch(console.error.bind(console));
		}
	}

)