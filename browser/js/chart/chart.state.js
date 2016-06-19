app.config(function($stateProvider){
	$stateProvider.state('chartState',{
		url: '/correlations/:id',
		controller: 'chartController',
		templateUrl: 'js/chart/charts.html',
		resolve: {
			userData: function(chartFactory, $stateParams){
				return chartFactory.getUserData($stateParams.id)
			}
		}
	})

	$stateProvider.state('chartState.line',{
		url: '/line',
		controller: 'chartController',
		templateUrl: 'js/chart/line.html',
	});

	$stateProvider.state('chartState.scatter',{
		url: '/scatter',
		controller: 'chartController',
		templateUrl: 'js/chart/scatter.html',
	});
})