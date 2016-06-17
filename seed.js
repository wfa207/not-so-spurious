var chalk = require('chalk');
var db = require('./server/db');
var User = db.model('user');
var Connection = db.model('connection');
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
        }
    ];

    var creatingConnections = connections.map(function (connectionObj) {
        return Connection.create(connectionObj);
    });

    return Promise.all(creatingConnections);

};

db.sync({ force: true })
    .then(function () {
        return seedUsers();
    })
    .then(function () {
        return seedConnections();
    })
    .then(function () {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    })
    .catch(function (err) {
        console.error(err);
        process.kill(1);
    });
