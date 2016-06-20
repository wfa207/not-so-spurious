app.factory('chartFactory', function($http){
	
	var chartFactory = {};

	function resToData (res){
		return res.data;
	}

	chartFactory.getUserData = function(id){
		return $http.get('/api/charts/data/' + id)
		.then(resToData)
	}
	

	return chartFactory;

})