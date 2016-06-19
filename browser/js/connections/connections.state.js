app.config(function($stateProvider){
	$stateProvider.state('ConnectionState', {
		url: '/connections',
		templateUrl: 'js/connections/connections.html',
		controller: 'ConnectionsController',
		resolve: {
			theConnections: function(ConnectionFactory){
				return ConnectionFactory.getAllConnections()
			}
		}
	});

	$stateProvider.state('ConnectionState.connect', {
		url: '/connectnow',
		templateUrl: 'js/connectnow/connect.html',
	});

});