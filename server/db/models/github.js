'use strict';
var crypto = require('crypto');
var _ = require('lodash');
var Sequelize = require('sequelize');

module.exports = function (db) {

    db.define('github', {
        date: {
            type: Sequelize.DATE
        },
        commits: {
            type: Sequelize.INTEGER
        }
    });

};