app.controller('chartController', function($scope, userData){

	$scope.userData = userData;


	var fitbitArr = [];
	var githubArr = [];
	var slackArr = [];

	function getValForRange(name, cat, valType, val, startDate, endDate){
		var dateArray = [];

		cat.forEach(function(item){
			if(new Date(item.date).valueOf() >= startDate && new Date(item.date).valueOf() <= endDate){
				dateArray.push(item[val])
				if(name === 'fitbit') fitbitArr.push(item[val]);
				if(name === 'github') githubArr.push(item[val]);
				if(name === 'slack') slackArr.push(item[val]);
			}
		});

		return dateArray.reduce(function(a,b){
			return a + b
		}, 0)
	};

	$scope.fitbitSteps = getValForRange('fitbit', userData.fitbits, userData.fitbits.steps, 'steps', 1451692446852, 1466463246854)
	$scope.githubCommits = getValForRange('github', userData.githubs, userData.githubs.commits, 'commits', 1451692446852, 1466463246854)
	$scope.slackMessages = getValForRange('slack', userData.slacks, userData.slacks.messages, 'messages', 1451692446852, 1466463246854)


	

	// var possibleData = [fitbits, githubs, runkeepers, slacks]

	// $scope.hasData = possibleData.filter(function(source){
	// 	return source.length > 0;
	// })

	// function k_combinations(set, k) {
	// 	var i, j, combs, head, tailcombs;
		
	// 	if (k > set.length || k <= 0) {
	// 		return [];
	// 	}
		
	// 	if (k == set.length) {
	// 		return [set];
	// 	}
		
	// 	if (k == 1) {
	// 		combs = [];
	// 		for (i = 0; i < set.length; i++) {
	// 			combs.push([set[i]]);
	// 		}
	// 		return combs;
	// 	}

	// 	combs = [];

	// 	for (i = 0; i < set.length - k + 1; i++) {
	// 		head = set.slice(i, i + 1);
	// 		tailcombs = k_combinations(set.slice(i + 1), k - 1);
	// 		for (j = 0; j < tailcombs.length; j++) {
	// 			combs.push(head.concat(tailcombs[j]));
	// 		}
	// 	}
	// 	return combs;
	// }

	// $scope.combinations = k_combinations($scope.hasData, 1)

})