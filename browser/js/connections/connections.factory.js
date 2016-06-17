app.factory('ConnectionFactory', function($http){
	return {
		getAllConnections: function(){
			return $http.get('/api/connections')
			.then(function(connects){
				return connects.data;
			})
		}
	}
})