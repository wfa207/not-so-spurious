app.controller('chartController', function($scope, userData, $state, $timeout){

	// immediately sends user to the line graphs state as soon as the resolve is complete
	if($state.current.name === 'chartState'){	
		$timeout(function() {
	    	$state.go('chartState.line');
	    }, 0);
	}


	$scope.userData = userData;

	var fitbitArr = [];
	var githubArr = [];
	var slackArr = [];

	var fitbitArrObj = [];
	var githubArrObj = [];
	var slackArrObj = [];

	function getValForRange(name, cat, valType, val, startDate, endDate){
		var dateArray = [];
		var i = 0;

		cat.forEach(function(item){
			if(new Date(item.date).valueOf() >= startDate && new Date(item.date).valueOf() <= endDate){
				dateArray.push(item[val])
				if(name === 'fitbit'){
					fitbitArr.push(item[val]);
					fitbitArrObj.push({x: i, val_0: item[val]});
				}
				else if(name === 'github'){
					githubArr.push(item[val]);
					githubArrObj.push({x: i, val_0: item[val]});
				} 
				else if(name === 'slack'){
					slackArr.push(item[val]);
					slackArrObj.push({x: i, val_0: item[val]});
				}
				i++
			}
		});

		return dateArray.reduce(function(a,b){
			return a + b
		}, 0)
	};

	$scope.fitbitSteps = getValForRange('fitbit', userData.fitbits, userData.fitbits.steps, 'steps', 1451692446852, 1466463246854);
	$scope.githubCommits = getValForRange('github', userData.githubs, userData.githubs.commits, 'commits', 1451692446852, 1466463246854);
	$scope.slackMessages = getValForRange('slack', userData.slacks, userData.slacks.messages, 'messages', 1451692446852, 1466463246854);




	// Correlation Calculation

	var calculate = function(values1, values2) {
		if (values1 instanceof Array && values2 instanceof Array) {
			if (values1.length == values2.length) {

				function average(arr){
					var sum = 0
					arr.forEach(function(num){
						sum += num;
					})
					return sum/arr.length;
				}

				var total = values1.length;
				var values1_average = average(values1);
				var values2_average = average(values2);

				var sum_values_average = 0;
				var sx = 0;
				var sy = 0;

				for (var index = 0, l = total; index < l; index ++) {
				var value1 = values1[index];
				var value2 = values2[index];

				var x = value1 - values1_average;
				var y = value2 - values2_average;

				sum_values_average += (x * y);

				sx += Math.pow(x, 2);
				sy += Math.pow(y, 2);
				}

				var n = total - 1;

				sx = sx / n;
				sy = sy / n;

				sx = Math.sqrt(sx);
				sy = Math.sqrt(sy);

				var correlation = (sum_values_average /  (n * sx * sy)).toFixed(9);

				return parseFloat(correlation);
			}
		}

		else throw TypeError('Invalid values');
	};


	$scope.fitGitCor = calculate(fitbitArr, githubArr)
	$scope.fitSlackCor = calculate(fitbitArr, slackArr)
	$scope.gitSlackCor = calculate(githubArr, slackArr)

	$scope.correlationStringGenerator = function(c){
		if(c < -.7) return 'The correlation coefficient is ' + c + '. This indicates a strong negative association.';
		if(c >= -.7 && c < -.3) return 'The correlation coefficient is ' + c + '. This indicates a weak negative association.';
		if(c >= -.3 && c < .3) return 'The correlation coefficient is ' + c + '. This indicates little or no association.';
		if(c >= .3 && c < .7) return 'The correlation coefficient is ' + c + '. This indicates a weak positive association.';
		if(c >= .7) return 'The correlation coefficient is ' + c + '. This indicates a strong positive association.';
	}

	var fitGitData = function (fitbitArr, githubArr){
		var arr = [];
		for(var i = 0; i < fitbitArr.length; i++){
			arr.push({x: fitbitArr[i], val_0: githubArr[i]})
		}
		return arr
	}



	// Graph Options



	// Fitbit and Github

	//Scatter graph
    $scope.scatterFitGit = {
      
      series: [
        {
          dataset: "fitGitData",
          key: 'val_0', 
          label: 'Commits:', 
          type: ['dot'],
          color: "rgb(126, 181, 63)",
          interpolation: {mode: 'cardinal', tension: 0.7},
          visible: true,
        }
      ],
		axes: { x: { key: "x" } },
		margin: { top: 5 }
    };

    //Line graph
    $scope.lineFitGit = {
      
      series: [
        {
          dataset: "fitbitArrObj",
          axis: "y",
          key: 'val_0', 
          label: 'Steps:', 
          type: ['dot', 'line'],
          color: "rgb(126, 181, 63)",
          interpolation: {mode: 'cardinal', tension: 0.7},
          visible: true,
        },
        {
          dataset: "githubArrObj",
          axis: "y2",
          key: 'val_0', 
          label: 'Commits:', 
          type: ['dot', 'line'],
          color: "rgb(200, 96, 69)",
          interpolation: {mode: 'cardinal', tension: 0.7},
          visible: true,
        }
      ],
		axes: { x: { key: "x" } },
		margin: { top: 5 }
    };





    // Fitbit and Slack

    //Scatter graph
    $scope.scatterFitSlack = {
          
      series: [
        {
          dataset: "fitSlackData",
          key: 'val_0', 
          label: 'Messages:', 
          type: ['dot'],
          color: "rgb(126, 181, 63)",
          interpolation: {mode: 'cardinal', tension: 0.7},
          visible: true,
        }
      ],
		axes: { x: { key: "x" } },
		margin: { top: 5 }
    };

    //Line graph
    $scope.lineFitSlack = {
      
      series: [
        {
          dataset: "fitbitArrObj",
          axis: "y",
          key: 'val_0', 
          label: 'Steps:', 
          type: ['dot', 'line'],
          color: "rgb(126, 181, 63)",
          interpolation: {mode: 'cardinal', tension: 0.7},
          visible: true,
        },
        {
          dataset: "slackArrObj",
          axis: "y2",
          key: 'val_0', 
          label: 'Messages:', 
          type: ['dot', 'line'],
          color: "rgb(200, 96, 69)",
          interpolation: {mode: 'cardinal', tension: 0.7},
          visible: true,
        }
      ],
		axes: { x: { key: "x" } },
		margin: { top: 5 }
    };



    // Github and Slack

    //Scatter graph
    $scope.scatterGitSlack = {
          
      series: [
        {
          dataset: "gitSlackData",
          key: 'val_0', 
          label: 'Messages:', 
          type: ['dot'],
          color: "rgb(126, 181, 63)",
          interpolation: {mode: 'cardinal', tension: 0.7},
          visible: true,
        }
      ],
		axes: { x: { key: "x" } },
		margin: { top: 5 }
    };

    //Line graph
    $scope.lineGitSlack = {
      
      series: [
        {
          dataset: "githubArrObj",
          axis: "y",
          key: 'val_0', 
          label: 'Steps:', 
          type: ['dot', 'line'],
          color: "rgb(126, 181, 63)",
          interpolation: {mode: 'cardinal', tension: 0.7},
          visible: true,
        },
        {
          dataset: "slackArrObj",
          axis: "y2",
          key: 'val_0', 
          label: 'Messages:', 
          type: ['dot', 'line'],
          color: "rgb(200, 96, 69)",
          interpolation: {mode: 'cardinal', tension: 0.7},
          visible: true,
        }
      ],
		axes: { x: { key: "x" } },
		margin: { top: 5 }
    };


	$scope.dataScatter = {
		fitGitData: fitGitData(fitbitArr, githubArr),
		fitSlackData: fitGitData(fitbitArr, slackArr),
		gitSlackData: fitGitData(githubArr, slackArr)
	};

	$scope.dataLine = {
		fitbitArrObj,
		githubArrObj,
		slackArrObj
	};


$scope.today = function() {
    $scope.dt = new Date();
};

$scope.today();


  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.opened = true;
  };
  
  $scope.open2 = function($event) {
    $event.preventDefault();
    $event.stopPropagation();
    $scope.opened2 = true;
  };

  $scope.dateOptions = {
    'year-format': "'yy'",
    'starting-day': 1
  };

  $scope.format = 'dd-MMMM-yyyy', 'yyyy/MM/dd', 'shortDate'

})













