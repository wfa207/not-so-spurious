app.controller('ConnectionsController', function($scope, theConnections, ConnectionFactory, $state, Session){
	$scope.theConnections = theConnections;
	$scope.user = Session.user
	console.log(Session);

	$scope.requestedConnections = ConnectionFactory.requestedConnections;

	$scope.requestedConnections = function(data){
			var newArr = data.filter(function(item){
				return item.clicked;
			})
			if(newArr.length < 2) console.log('need to select at least 2')
			else $state.go('ConnectionState.connect');
	}

	$scope.$state = $state;

})