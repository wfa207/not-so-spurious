'use strict';
var crypto = require('crypto');
var _ = require('lodash');
var Sequelize = require('sequelize');

module.exports = function (db) {

    db.define('runkeeper', {
        date: {
            type: Sequelize.DATE
        },
        sleep: {
            type: Sequelize.INTEGER
        }
    });

};