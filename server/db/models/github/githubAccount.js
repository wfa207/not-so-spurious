'use strict';
var crypto = require('crypto');
var _ = require('lodash');
var Sequelize = require('sequelize');

module.exports = function (db) {

    db.define('githubAccount', {
    	id: {
    		type: Sequelize.STRING,
    		primaryKey: true
    	},
    	username: {
    		type: Sequelize.STRING
    	},
    	profileUrl: {
    		type: Sequelize.STRING
    	},    	
        accessToken: {
            type: Sequelize.STRING
        }
    });

};