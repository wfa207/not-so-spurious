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

	$scope.fitbitArr = fitbitArr;
	$scope.slackArr = slackArr;
	$scope.githubArr = githubArr;

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


	$scope.calcTest = calculate(fitbitArr, githubArr)


    $scope.options = {
      
      series: [
        {
          dataset: "numerical",
          key: 'val_0', 
          label: 'One', 
          type: ['line', 'dot', 'line', 'area'],
          color: "rgb(126, 181, 63)",
          interpolation: {mode: 'cardinal', tension: 0.7},
          visible: true,
        },
        {
          dataset: "numerical2",
          key: 'val_0', 
          type: ['line', 'dot', 'area'],
          label: 'Two',
          color: "rgb(200, 96, 69)",
          interpolation: {mode: 'cardinal', tension: 0.7},
          visible: true,
        }
      ],

		axes: { x: { key: "x" } },
		margin: { top: 5 }

    };

	$scope.data = {
		numerical: [
			{
			  x: 0,
			  val_0: 0,
			},
			{
			  x: 1,
			  val_0: 0.993,
			},
			{
			  x: 2,
			  val_0: 1.947,
			},
			{
			  x: 3,
			  val_0: 2.823,
			},
			{
			  x: 4,
			  val_0: 3.587,
			},
			{
			  x: 5,
			  val_0: 4.207,
			},
			{
			  x: 6,
			  val_0: 4.66,
			},
			{
			  x: 7,
			  val_0: 4.927,
			},
			{
			  x: 8,
			  val_0: 4.998,
			},
			{
			  x: 9,
			  val_0: 4.869,
			}
			],
			numerical2: [
			{
			  x: 0,
			  val_0: -0,
			},
			{
			  x: 1,
			  val_0: -0.993,
			},
			{
			  x: 2,
			  val_0: -1.947,
			},
			{
			  x: 3,
			  val_0: -2.823,
			},
			{
			  x: 4,
			  val_0: -3.587,
			},
			{
			  x: 5,
			  val_0: -4.207,
			},
			{
			  x: 6,
			  val_0: -4.66,
			},
			{
			  x: 7,
			  val_0: -4.927,
			},
			{
			  x: 8,
			  val_0: -4.998,
			},
			{
			  x: 9,
			  val_0: -4.869,
			}
		],

	};



})













