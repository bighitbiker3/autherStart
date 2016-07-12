
app.factory("LoginFactory", function($http){

	return {
		loginUser: function(data){
			return $http.post("/auth/login", data)
			.then(function(res){
				console.log(res);
				return res.data;
			})
		}
	}

})