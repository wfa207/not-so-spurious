'use strict';
var crypto = require('crypto');
var _ = require('lodash');
var Sequelize = require('sequelize');

module.exports = function (db) {

    db.define('connection', {
        name: {
            type: Sequelize.STRING
        },
        logoUrl: {
            type: Sequelize.STRING
        }
    });

};