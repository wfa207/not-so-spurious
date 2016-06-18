'use strict';
var crypto = require('crypto');
var _ = require('lodash');
var Sequelize = require('sequelize');

module.exports = function (db) {

    db.define('github', {
    	id: {
    		type: Sequelize.STRING,
    		primaryKey: true
    	},
        accessToken: {
            type: Sequelize.STRING
        }
    });

};