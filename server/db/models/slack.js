'use strict';
var crypto = require('crypto');
var _ = require('lodash');
var Sequelize = require('sequelize');

module.exports = function (db) {

    db.define('slack', {
        date: {
            type: Sequelize.DATE
        },
        messages: {
            type: Sequelize.INTEGER
        }
    });

};