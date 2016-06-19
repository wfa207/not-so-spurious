app.controller('ConnectionsController', function($scope, theConnections, ConnectionFactory, $state, $uibModal, $log){
	$scope.theConnections = theConnections;

	$scope.requestedConnections = ConnectionFactory.requestedConnections;

	$scope.requestedConnections = function(data){
			var newArr = data.filter(function(item){
				return item.clicked;
			})
			if(newArr.length < 2) $scope.open()
			else $state.go('ConnectionState.connect');
	}

	$scope.$state = $state;


	// Modal Stuff

	$scope.open = function () {
		var modalInstance = $uibModal.open({
			animation: true,
			templateUrl: 'myModalContent.html',
		});
	};

	$scope.toggleAnimation = function () {
		$scope.animationsEnabled = !$scope.animationsEnabled;
	};


});
