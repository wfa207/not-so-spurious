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
})