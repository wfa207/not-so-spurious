app.controller('chartController', function($scope, userData, $state, $timeout){

	// immediately sends user to the line graphs state as soon as the resolve is complete
	if($state.current.name === 'chartState'){	
		$timeout(function() {
	    	$state.go('chartState.line');
	    }, 0);
	}

	$scope.userData = userData;

	var fitbitArr;
	var githubArr;
	var slackArr;

	var fitbitArrObj = [];
	var githubArrObj = [];
	var slackArrObj = [];


	$scope.generateData = function(){

		// mkae this date of first data entry
		if(!$scope.date1) $scope.date1 = 1451692446852;
		// make this date of last data entry
		if(!$scope.date2) $scope.date2 = 1466463246854;


		if(typeof $scope.date1 !== 'number') $scope.date1 = new Date($scope.date1).valueOf();
		if(typeof $scope.date2 !== 'number') $scope.date2 = new Date($scope.date2).valueOf();

		// if they enter a blank entry
		if($scope.date1 === NaN) $scope.date1 = 1451692446852;
		if($scope.date2 === NaN) $scope.date2 = 1466463246854;


		var i = 0;
		var j = 0;
		var k = 0;

		// This is for the scatter points
		fitbitArr = userData.fitbits.map(function(obj){ 
			if(new Date(obj.date).valueOf() >= $scope.date1 && new Date(obj.date).valueOf() <= $scope.date2) return obj.steps
		});
		githubArr = userData.githubs.map(function(obj){ 
			if(new Date(obj.date).valueOf() >= $scope.date1 && new Date(obj.date).valueOf() <= $scope.date2) return obj.commits
		});
		slackArr = userData.slacks.map(function(obj){ 
			if(new Date(obj.date).valueOf() >= $scope.date1 && new Date(obj.date).valueOf() <= $scope.date2) return obj.messages
		});


		// This is for the line graphs
		fitbitArrObj = userData.fitbits.map(function(obj){ 
			if(new Date(obj.date).valueOf() >= $scope.date1 && new Date(obj.date).valueOf() <= $scope.date2){
				i++
				return {x: i, val_0: obj.steps}
			}
		});
		githubArrObj = userData.githubs.map(function(obj){ 
			if(new Date(obj.date).valueOf() >= $scope.date1 && new Date(obj.date).valueOf() <= $scope.date2){
				j++
				return {x: j, val_0: obj.commits}
			}
		});
		slackArrObj = userData.slacks.map(function(obj){ 
			if(new Date(obj.date).valueOf() >= $scope.date1 && new Date(obj.date).valueOf() <= $scope.date2){
				k++
				return {x: k, val_0: obj.messages}
			}
		});

		console.log($scope.$$phase)
		console.log(fitbitArr)

	}

	$scope.generateData()


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


	// Correlation coefficients between datasets
	$scope.fitGitCor = calculate(fitbitArr, githubArr)
	$scope.fitSlackCor = calculate(fitbitArr, slackArr)
	$scope.gitSlackCor = calculate(githubArr, slackArr)

	// Creating string message about correlations
	$scope.correlationStringGenerator = function(c){
		if(c < -.7) return 'The correlation coefficient is ' + c + '. This indicates a strong negative association.';
		if(c >= -.7 && c < -.3) return 'The correlation coefficient is ' + c + '. This indicates a weak negative association.';
		if(c >= -.3 && c < .3) return 'The correlation coefficient is ' + c + '. This indicates little or no association.';
		if(c >= .3 && c < .7) return 'The correlation coefficient is ' + c + '. This indicates a weak positive association.';
		if(c >= .7) return 'The correlation coefficient is ' + c + '. This indicates a strong positive association.';
	}

	var scatterDataGenerator = function (fitbitArr, githubArr){
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
          label: 'Commits', 
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
          label: 'Steps', 
          type: ['dot', 'line'],
          color: "rgb(126, 181, 63)",
          interpolation: {mode: 'cardinal', tension: 0.7},
          visible: true,
        },
        {
          dataset: "githubArrObj",
          axis: "y2",
          key: 'val_0', 
          label: 'Commits', 
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
          label: 'Messages', 
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
          label: 'Steps', 
          type: ['dot', 'line'],
          color: "rgb(126, 181, 63)",
          interpolation: {mode: 'cardinal', tension: 0.7},
          visible: true,
        },
        {
          dataset: "slackArrObj",
          axis: "y2",
          key: 'val_0', 
          label: 'Messages', 
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
          label: 'Commits', 
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
          label: 'Commits', 
          type: ['dot', 'line'],
          color: "rgb(126, 181, 63)",
          interpolation: {mode: 'cardinal', tension: 0.7},
          visible: true,
        },
        {
          dataset: "slackArrObj",
          axis: "y2",
          key: 'val_0', 
          label: 'Messages', 
          type: ['dot', 'line'],
          color: "rgb(200, 96, 69)",
          interpolation: {mode: 'cardinal', tension: 0.7},
          visible: true,
        }
      ],
		axes: { x: { key: "x" } },
		margin: { top: 5 }
    };


    console.log('seems like a digest', $scope.date1)

	$scope.dataScatter = {
		fitGitData: scatterDataGenerator(fitbitArr, githubArr),
		fitSlackData: scatterDataGenerator(fitbitArr, slackArr),
		gitSlackData: scatterDataGenerator(slackArr, githubArr)
	};

	$scope.dataLine = {
		fitbitArrObj,
		githubArrObj,
		slackArrObj
	};


	// Date Picker

	$scope.today = function() {
	    $scope.dt = new Date();
	};

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

	$scope.format = 'dd-MMMM-yyyy', 'yyyy/MM/dd', 'shortDate'

})













