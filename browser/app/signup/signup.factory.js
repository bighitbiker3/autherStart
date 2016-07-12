
app.factory("SignupFactory", function($http){
	return {
		signup: function(data){
			return $http.post("/auth/signup", data)
			.then(function(res){
				console.log(res);
				return res.data;
			})
		}
	}

})
