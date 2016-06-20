app.factory('ConnectionFactory', function($http){
	return {
		getAllConnections: function(){
			return $http.get('/api/connections')
			.then(function(connects){
				return connects.data;
			})
		},
		connect: function(service) {
			$http.get('/auth/' + service)
			.then(function() {
				$state.go('ConnectionState');
			});
		},
		disconnect: function(service) {
			$http.get('/unlink/' + service)
			.then(function() {
				$state.go('ConnectionState');
			});
		}
	}
})