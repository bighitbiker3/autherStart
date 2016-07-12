app.factory("LoginFactory", function($http){
	return {
		loginUser: function(data){
			return $http.post("/auth/login", data)
			.then(function(res){
				console.log(res);
				return res.data;
			});
		}
	};

});


app.factory("SignupFactory", function($http){
	return {
		signup: function(data){
			return $http.post("/auth/signup", data)
			.then(function(res){
				console.log(res);
				return res.data;
			});
		}
	};

});

app.factory('LogOutFactory', function($http){
  return {
    logout: function(){
      return $http.get('/auth/logout')
      .then(function(res){
        return res;
      });
    }
  };
});

app.factory('UserFactory', function($http){
	return {
		setUser: function(){

		},
		getUser: function(){

		}
	}
})
