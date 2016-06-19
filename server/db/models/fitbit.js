'use strict';
var crypto = require('crypto');
var _ = require('lodash');
var Sequelize = require('sequelize');

module.exports = function (db) {

    db.define('fitbit', {
        date: {
            type: Sequelize.DATE
        },
        steps: {
            type: Sequelize.INTEGER
        }
    });

};