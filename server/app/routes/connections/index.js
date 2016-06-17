/* jshint node:true*/
'use strict';

var db = require('../../../db');
var Connection = db.model('connection');
var router = require('express').Router();

module.exports = router;


router.get('/', function (req, res, next) {
    Connection.findAll()
    .then(function (connections) {
        res.send(connections);
    })
    .catch(next);
});
