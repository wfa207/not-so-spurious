/* jshint node:true*/
'use strict';

var db = require('../../../db');
var User = db.model('user');
var Fitbit = db.model('fitbit');
var Github = db.model('github');
var Runkeeper = db.model('runkeeper');
var Slack = db.model('slack');
var router = require('express').Router();

module.exports = router;


router.get('/data/:id', function(req, res, next){
    User.findOne({
        where: { id: req.params.id },
        include: [{model: Fitbit, attributes: ['steps', 'date']}, {model: Github, attributes: ['commits', 'date']}, 
            {model: Slack, attributes: ['messages', 'date']}
        ]
    })
    .then(function(userData){
        res.send(userData)
    })
})


// router.get('/fitbit/:id', function (req, res, next) {
//     Fitbit.findAll({
//     	where: { userId: req.params.id },
//     })
//     .then(function (steps) {
//         res.send(steps);
//     })
//     .catch(next);
// });

// router.get('/github/:id', function (req, res, next) {
//     Github.findAll({
//     	where: {
//     		userId: req.params.id
//     	}
//     })
//     .then(function (commits) {
//         res.send(commits);
//     })
//     .catch(next);
// });

// router.get('/runkeeper/:id', function (req, res, next) {
//     Runkeeper.findAll({
//     	where: {
//     		userId: req.params.id
//     	}
//     })
//     .then(function (sleep) {
//         res.send(sleep);
//     })
//     .catch(next);
// });

// router.get('/slack/:id', function (req, res, next) {
//     Slack.findAll({
//     	where: {
//     		userId: req.params.id
//     	}
//     })
//     .then(function (messages) {
//         res.send(messages);
//     })
//     .catch(next);
// });