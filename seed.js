var chalk = require('chalk');
var db = require('./server/db');
var User = db.model('user');
var Connection = db.model('connection');
var Fitbit = db.model('fitbit');
var Github = db.model('github');
var RunKeeper = db.model('runkeeper');
var Slack = db.model('slack');
var Promise = require('sequelize').Promise;

var seedUsers = function () {

    var users = [
        {
            email: 'testing@fsa.com',
            password: 'password'
        },
        {
            email: 'obama@gmail.com',
            password: 'potus'
        }
    ];

    var creatingUsers = users.map(function (userObj) {
        return User.create(userObj);
    });

    return Promise.all(creatingUsers);

};

var seedConnections = function () {

    var connections = [
        {
            name: 'Fitbit',
            logoUrl: 'https://index.tnwcdn.com/images/620ea20d3096ff399a780bd927dedd0bd2893435.png'
        },
        {
            name: 'Github',
            logoUrl: 'https://assets-cdn.github.com/images/modules/logos_page/Octocat.png'
        },
        {
            name: 'Slack',
            logoUrl: 'https://upload.wikimedia.org/wikipedia/en/7/76/Slack_Icon.png'
        },
        {
            name: 'RunKeeper',
            logoUrl: 'http://www.logoed.co.uk/wp-content/uploads/2015/08/icon.gif'
        }
    ];

    var creatingConnections = connections.map(function (connectionObj) {
        return Connection.create(connectionObj);
    });

    return Promise.all(creatingConnections);

};

var seedFitbits = function () {

    var fitbits = [
        {
            date: '2016-01-01 18:54:06.853',
            steps: 3847,
            userId: 1
        },
        {
            date: '2016-01-02 18:54:06.853',
            steps: 5634,
            userId: 1
        },        
        {
            date: '2016-01-03 18:54:06.853',
            steps: 4523,
            userId: 1
        },        
        {
            date: '2016-01-04 18:54:06.853',
            steps: 15754,
            userId: 1
        },        
        {
            date: '2016-02-05 18:54:06.853',
            steps: 3345,
            userId: 1
        },        
        {
            date: '2016-02-06 18:54:06.853',
            steps: 6547,
            userId: 1
        },        
        {
            date: '2016-02-07 18:54:06.853',
            steps: 1233,
            userId: 1
        },        
        {
            date: '2016-03-08 18:54:06.853',
            steps: 5466,
            userId: 1
        },        
        {
            date: '2016-03-09 18:54:06.853',
            steps: 12667,
            userId: 1
        },        
        {
            date: '2016-03-10 18:54:06.853',
            steps: 23354,
            userId: 1
        },        
        {
            date: '2016-03-11 18:54:06.853',
            steps: 13849,
            userId: 1
        },        
        {
            date: '2016-04-12 18:54:06.853',
            steps: 4994,
            userId: 1
        },        
        {
            date: '2016-04-13 18:54:06.853',
            steps: 7538,
            userId: 1
        },        
        {
            date: '2016-04-14 18:54:06.853',
            steps: 12466,
            userId: 1
        },        
        {
            date: '2016-04-15 18:54:06.853',
            steps: 14564,
            userId: 1
        },        
        {
            date: '2016-04-16 18:54:06.853',
            steps: 3453,
            userId: 1
        },        
        {
            date: '2016-05-17 18:54:06.853',
            steps: 6753,
            userId: 1
        },        
        {
            date: '2016-05-18 18:54:06.853',
            steps: 9463,
            userId: 1
        },        
        {
            date: '2016-05-19 18:54:06.853',
            steps: 14583,
            userId: 1
        },        
        {
            date: '2016-05-20 18:54:06.853',
            steps: 12475,
            userId: 1
        },        
        {
            date: '2016-05-21 18:54:06.853',
            steps: 7789,
            userId: 1
        },        
        {
            date: '2016-05-22 18:54:06.853',
            steps: 9274,
            userId: 1
        },        
        {
            date: '2016-05-23 18:54:06.853',
            steps: 37845,
            userId: 1
        },        
        {
            date: '2016-05-24 18:54:06.853',
            steps: 9355,
            userId: 1
        },
        {
            date: '2016-05-25 18:54:06.853',
            steps: 12453,
            userId: 1
        },            
        {
            date: '2016-06-01 18:54:06.853',
            steps: 5322,
            userId: 1
        },            
        {
            date: '2016-06-02 18:54:06.853',
            steps: 4534,
            userId: 1
        },            
        {
            date: '2016-06-03 18:54:06.853',
            steps: 9382,
            userId: 1
        },            
        {
            date: '2016-06-04 18:54:06.853',
            steps: 5583,
            userId: 1
        },            
        {
            date: '2016-06-06 18:54:06.853',
            steps: 12494,
            userId: 1
        },            
        {
            date: '2016-06-06 18:54:06.853',
            steps: 23455,
            userId: 1
        },            
        {
            date: '2016-06-07 18:54:06.853',
            steps: 12988,
            userId: 1
        },            
        {
            date: '2016-06-08 18:54:06.853',
            steps: 12947,
            userId: 1
        },            
        {
            date: '2016-06-09 18:54:06.853',
            steps: 11245,
            userId: 1
        },            
        {
            date: '2016-06-10 18:54:06.853',
            steps: 3874,
            userId: 1
        },            
        {
            date: '2016-06-11 18:54:06.853',
            steps: 8393,
            userId: 1
        },            
        {
            date: '2016-06-12 18:54:06.853',
            steps: 2843,
            userId: 1
        },            
        {
            date: '2016-06-13 18:54:06.853',
            steps: 8478,
            userId: 1
        },            
        {
            date: '2016-06-14 18:54:06.853',
            steps: 7483,
            userId: 1
        },            
        {
            date: '2016-06-15 18:54:06.853',
            steps: 9384,
            userId: 1
        },            
        {
            date: '2016-06-16 18:54:06.853',
            steps: 12453,
            userId: 1
        },            
        {
            date: '2016-06-17 18:54:06.853',
            steps: 12455,
            userId: 1
        },            
        {
            date: '2016-06-18 18:54:06.853',
            steps: 13585,
            userId: 1
        },            
        {
            date: '2016-06-19 18:54:06.853',
            steps: 9837,
            userId: 1
        },            
        {
            date: '2016-06-20 18:54:06.853',
            steps: 7393,
            userId: 1
        }
    ];

    var creatingFitbits = fitbits.map(function (fitbitObj) {
        return Fitbit.create(fitbitObj);
    });

    return Promise.all(creatingFitbits);

};

var seedGithubs = function () {

    var githubs = [
        {
            date: '2016-01-01 18:54:06.853',
            commits: 1,
            userId: 1
        },
        {
            date: '2016-01-02 18:54:06.853',
            commits: 3,
            userId: 1
        },        
        {
            date: '2016-01-03 18:54:06.853',
            commits: 5,
            userId: 1
        },        
        {
            date: '2016-01-04 18:54:06.853',
            commits: 2,
            userId: 1
        },        
        {
            date: '2016-02-05 18:54:06.853',
            commits: 5,
            userId: 1
        },        
        {
            date: '2016-02-06 18:54:06.853',
            commits: 6,
            userId: 1
        },        
        {
            date: '2016-02-07 18:54:06.853',
            commits: 7,
            userId: 1
        },        
        {
            date: '2016-03-08 18:54:06.853',
            commits: 12,
            userId: 1
        },        
        {
            date: '2016-03-09 18:54:06.853',
            commits: 5,
            userId: 1
        },        
        {
            date: '2016-03-10 18:54:06.853',
            commits: 0,
            userId: 1
        },        
        {
            date: '2016-03-11 18:54:06.853',
            commits: 0,
            userId: 1
        },        
        {
            date: '2016-04-12 18:54:06.853',
            commits: 1,
            userId: 1
        },        
        {
            date: '2016-04-13 18:54:06.853',
            commits: 2,
            userId: 1
        },        
        {
            date: '2016-04-14 18:54:06.853',
            commits: 6,
            userId: 1
        },        
        {
            date: '2016-04-15 18:54:06.853',
            commits: 24,
            userId: 1
        },        
        {
            date: '2016-04-16 18:54:06.853',
            commits: 43,
            userId: 1
        },        
        {
            date: '2016-05-17 18:54:06.853',
            commits: 43,
            userId: 1
        },        
        {
            date: '2016-05-18 18:54:06.853',
            commits: 5,
            userId: 1
        },        
        {
            date: '2016-05-19 18:54:06.853',
            commits: 33,
            userId: 1
        },        
        {
            date: '2016-05-20 18:54:06.853',
            commits: 23,
            userId: 1
        },        
        {
            date: '2016-05-21 18:54:06.853',
            commits: 12,
            userId: 1
        },        
        {
            date: '2016-05-22 18:54:06.853',
            commits: 5,
            userId: 1
        },        
        {
            date: '2016-05-23 18:54:06.853',
            commits: 21,
            userId: 1
        },        
        {
            date: '2016-05-24 18:54:06.853',
            commits: 53,
            userId: 1
        },
        {
            date: '2016-05-25 18:54:06.853',
            commits: 12,
            userId: 1
        },            
        {
            date: '2016-06-01 18:54:06.853',
            commits: 11,
            userId: 1
        },            
        {
            date: '2016-06-02 18:54:06.853',
            commits: 6,
            userId: 1
        },            
        {
            date: '2016-06-03 18:54:06.853',
            commits: 4,
            userId: 1
        },            
        {
            date: '2016-06-04 18:54:06.853',
            commits: 29,
            userId: 1
        },            
        {
            date: '2016-06-06 18:54:06.853',
            commits: 4,
            userId: 1
        },            
        {
            date: '2016-06-06 18:54:06.853',
            commits: 32,
            userId: 1
        },            
        {
            date: '2016-06-07 18:54:06.853',
            commits: 23,
            userId: 1
        },            
        {
            date: '2016-06-08 18:54:06.853',
            commits: 12,
            userId: 1
        },            
        {
            date: '2016-06-09 18:54:06.853',
            commits: 45,
            userId: 1
        },            
        {
            date: '2016-06-10 18:54:06.853',
            commits: 3,
            userId: 1
        },            
        {
            date: '2016-06-11 18:54:06.853',
            commits: 2,
            userId: 1
        },            
        {
            date: '2016-06-12 18:54:06.853',
            commits: 4,
            userId: 1
        },            
        {
            date: '2016-06-13 18:54:06.853',
            commits: 6,
            userId: 1
        },            
        {
            date: '2016-06-14 18:54:06.853',
            commits: 34,
            userId: 1
        },            
        {
            date: '2016-06-15 18:54:06.853',
            commits: 2,
            userId: 1
        },            
        {
            date: '2016-06-16 18:54:06.853',
            commits: 7,
            userId: 1
        },            
        {
            date: '2016-06-17 18:54:06.853',
            commits: 19,
            userId: 1
        },            
        {
            date: '2016-06-18 18:54:06.853',
            commits: 3,
            userId: 1
        },            
        {
            date: '2016-06-19 18:54:06.853',
            commits: 5,
            userId: 1
        },            
        {
            date: '2016-06-20 18:54:06.853',
            commits: 12,
            userId: 1
        }
    ];

    var creatingGithubs = githubs.map(function (githubObj) {
        return Github.create(githubObj);
    });

    return Promise.all(creatingGithubs);

};

var seedRunkeepers = function () {

    var runkeepers = [
        {
            date: '2016-01-01 18:54:06.853',
            sleep: 3847,
            userId: 1
        },
        {
            date: '2016-01-02 18:54:06.853',
            sleep: 5634,
            userId: 1
        },        
        {
            date: '2016-01-03 18:54:06.853',
            sleep: 4523,
            userId: 1
        },        
        {
            date: '2016-01-04 18:54:06.853',
            sleep: 15754,
            userId: 1
        },        
        {
            date: '2016-02-05 18:54:06.853',
            sleep: 3345,
            userId: 1
        },        
        {
            date: '2016-02-06 18:54:06.853',
            sleep: 6547,
            userId: 1
        },        
        {
            date: '2016-02-07 18:54:06.853',
            sleep: 1233,
            userId: 1
        },        
        {
            date: '2016-03-08 18:54:06.853',
            sleep: 5466,
            userId: 1
        },        
        {
            date: '2016-03-09 18:54:06.853',
            sleep: 12667,
            userId: 1
        },        
        {
            date: '2016-03-10 18:54:06.853',
            sleep: 23354,
            userId: 1
        },        
        {
            date: '2016-03-11 18:54:06.853',
            sleep: 13849,
            userId: 1
        },        
        {
            date: '2016-04-12 18:54:06.853',
            sleep: 4994,
            userId: 1
        },        
        {
            date: '2016-04-13 18:54:06.853',
            sleep: 7538,
            userId: 1
        },        
        {
            date: '2016-04-14 18:54:06.853',
            sleep: 12466,
            userId: 1
        },        
        {
            date: '2016-04-15 18:54:06.853',
            sleep: 14564,
            userId: 1
        },        
        {
            date: '2016-04-16 18:54:06.853',
            sleep: 3453,
            userId: 1
        },        
        {
            date: '2016-05-17 18:54:06.853',
            sleep: 6753,
            userId: 1
        },        
        {
            date: '2016-05-18 18:54:06.853',
            sleep: 9463,
            userId: 1
        },        
        {
            date: '2016-05-19 18:54:06.853',
            sleep: 14583,
            userId: 1
        },        
        {
            date: '2016-05-20 18:54:06.853',
            sleep: 12475,
            userId: 1
        },        
        {
            date: '2016-05-21 18:54:06.853',
            sleep: 7789,
            userId: 1
        },        
        {
            date: '2016-05-22 18:54:06.853',
            sleep: 9274,
            userId: 1
        },        
        {
            date: '2016-05-23 18:54:06.853',
            sleep: 37845,
            userId: 1
        },        
        {
            date: '2016-05-24 18:54:06.853',
            sleep: 9355,
            userId: 1
        },
        {
            date: '2016-05-25 18:54:06.853',
            sleep: 12453,
            userId: 1
        },            
        {
            date: '2016-06-01 18:54:06.853',
            sleep: 5322,
            userId: 1
        },            
        {
            date: '2016-06-02 18:54:06.853',
            sleep: 4534,
            userId: 1
        },            
        {
            date: '2016-06-03 18:54:06.853',
            sleep: 9382,
            userId: 1
        },            
        {
            date: '2016-06-04 18:54:06.853',
            sleep: 5583,
            userId: 1
        },            
        {
            date: '2016-06-06 18:54:06.853',
            sleep: 12494,
            userId: 1
        },            
        {
            date: '2016-06-06 18:54:06.853',
            sleep: 23455,
            userId: 1
        },            
        {
            date: '2016-06-07 18:54:06.853',
            sleep: 12988,
            userId: 1
        },            
        {
            date: '2016-06-08 18:54:06.853',
            sleep: 12947,
            userId: 1
        },            
        {
            date: '2016-06-09 18:54:06.853',
            sleep: 11245,
            userId: 1
        },            
        {
            date: '2016-06-10 18:54:06.853',
            sleep: 3874,
            userId: 1
        },            
        {
            date: '2016-06-11 18:54:06.853',
            sleep: 8393,
            userId: 1
        },            
        {
            date: '2016-06-12 18:54:06.853',
            sleep: 2843,
            userId: 1
        },            
        {
            date: '2016-06-13 18:54:06.853',
            sleep: 8478,
            userId: 1
        },            
        {
            date: '2016-06-14 18:54:06.853',
            sleep: 7483,
            userId: 1
        },            
        {
            date: '2016-06-15 18:54:06.853',
            sleep: 9384,
            userId: 1
        },            
        {
            date: '2016-06-16 18:54:06.853',
            sleep: 12453,
            userId: 1
        },            
        {
            date: '2016-06-17 18:54:06.853',
            sleep: 12455,
            userId: 1
        },            
        {
            date: '2016-06-18 18:54:06.853',
            sleep: 13585,
            userId: 1
        },            
        {
            date: '2016-06-19 18:54:06.853',
            sleep: 9837,
            userId: 1
        },            
        {
            date: '2016-06-20 18:54:06.853',
            sleep: 7393,
            userId: 1
        }
    ];

    var creatingRunkeepers = runkeepers.map(function (runkeeperObj) {
        return RunKeeper.create(runkeeperObj);
    });

    return Promise.all(creatingRunkeepers);

};

var seedSlacks = function () {

    var slacks = [
        {
            date: '2016-01-01 18:54:06.853',
            messages: 3847,
            userId: 1
        },
        {
            date: '2016-01-02 18:54:06.853',
            messages: 5634,
            userId: 1
        },        
        {
            date: '2016-01-03 18:54:06.853',
            messages: 4523,
            userId: 1
        },        
        {
            date: '2016-01-04 18:54:06.853',
            messages: 15754,
            userId: 1
        },        
        {
            date: '2016-02-05 18:54:06.853',
            messages: 3345,
            userId: 1
        },        
        {
            date: '2016-02-06 18:54:06.853',
            messages: 6547,
            userId: 1
        },        
        {
            date: '2016-02-07 18:54:06.853',
            messages: 1233,
            userId: 1
        },        
        {
            date: '2016-03-08 18:54:06.853',
            messages: 5466,
            userId: 1
        },        
        {
            date: '2016-03-09 18:54:06.853',
            messages: 12667,
            userId: 1
        },        
        {
            date: '2016-03-10 18:54:06.853',
            messages: 23354,
            userId: 1
        },        
        {
            date: '2016-03-11 18:54:06.853',
            messages: 13849,
            userId: 1
        },        
        {
            date: '2016-04-12 18:54:06.853',
            messages: 4994,
            userId: 1
        },        
        {
            date: '2016-04-13 18:54:06.853',
            messages: 7538,
            userId: 1
        },        
        {
            date: '2016-04-14 18:54:06.853',
            messages: 12466,
            userId: 1
        },        
        {
            date: '2016-04-15 18:54:06.853',
            messages: 14564,
            userId: 1
        },        
        {
            date: '2016-04-16 18:54:06.853',
            messages: 3453,
            userId: 1
        },        
        {
            date: '2016-05-17 18:54:06.853',
            messages: 6753,
            userId: 1
        },        
        {
            date: '2016-05-18 18:54:06.853',
            messages: 9463,
            userId: 1
        },        
        {
            date: '2016-05-19 18:54:06.853',
            messages: 14583,
            userId: 1
        },        
        {
            date: '2016-05-20 18:54:06.853',
            messages: 12475,
            userId: 1
        },        
        {
            date: '2016-05-21 18:54:06.853',
            messages: 7789,
            userId: 1
        },        
        {
            date: '2016-05-22 18:54:06.853',
            messages: 9274,
            userId: 1
        },        
        {
            date: '2016-05-23 18:54:06.853',
            messages: 37845,
            userId: 1
        },        
        {
            date: '2016-05-24 18:54:06.853',
            messages: 9355,
            userId: 1
        },
        {
            date: '2016-05-25 18:54:06.853',
            messages: 12453,
            userId: 1
        },            
        {
            date: '2016-06-01 18:54:06.853',
            messages: 5322,
            userId: 1
        },            
        {
            date: '2016-06-02 18:54:06.853',
            messages: 4534,
            userId: 1
        },            
        {
            date: '2016-06-03 18:54:06.853',
            messages: 9382,
            userId: 1
        },            
        {
            date: '2016-06-04 18:54:06.853',
            messages: 5583,
            userId: 1
        },            
        {
            date: '2016-06-06 18:54:06.853',
            messages: 12494,
            userId: 1
        },            
        {
            date: '2016-06-06 18:54:06.853',
            messages: 23455,
            userId: 1
        },            
        {
            date: '2016-06-07 18:54:06.853',
            messages: 12988,
            userId: 1
        },            
        {
            date: '2016-06-08 18:54:06.853',
            messages: 12947,
            userId: 1
        },            
        {
            date: '2016-06-09 18:54:06.853',
            messages: 11245,
            userId: 1
        },            
        {
            date: '2016-06-10 18:54:06.853',
            messages: 3874,
            userId: 1
        },            
        {
            date: '2016-06-11 18:54:06.853',
            messages: 8393,
            userId: 1
        },            
        {
            date: '2016-06-12 18:54:06.853',
            messages: 2843,
            userId: 1
        },            
        {
            date: '2016-06-13 18:54:06.853',
            messages: 8478,
            userId: 1
        },            
        {
            date: '2016-06-14 18:54:06.853',
            messages: 7483,
            userId: 1
        },            
        {
            date: '2016-06-15 18:54:06.853',
            messages: 9384,
            userId: 1
        },            
        {
            date: '2016-06-16 18:54:06.853',
            messages: 12453,
            userId: 1
        },            
        {
            date: '2016-06-17 18:54:06.853',
            messages: 12455,
            userId: 1
        },            
        {
            date: '2016-06-18 18:54:06.853',
            messages: 13585,
            userId: 1
        },            
        {
            date: '2016-06-19 18:54:06.853',
            messages: 9837,
            userId: 1
        },            
        {
            date: '2016-06-20 18:54:06.853',
            messages: 7393,
            userId: 1
        }
    ];

    var creatingSlacks = slacks.map(function (slackObj) {
        return Slack.create(slackObj);
    });

    return Promise.all(creatingSlacks);

};

db.sync({ force: true })
    .then(function () {
        return seedUsers();
    })
    .then(function () {
        return seedConnections();
    })
    .then(function () {
        return seedFitbits();
    })
    .then(function () {
        return seedGithubs();
    })
    .then(function () {
        return seedRunkeepers();
    })
    .then(function () {
        return seedSlacks();
    })
    .then(function () {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    })
    .catch(function (err) {
        console.error(err);
        process.kill(1);
    });
