'use strict'
var Sequelize = require('sequelize');
var crypto = require('crypto');
var _ = require('lodash');

module.exports = function(db) {

	db.define('githubData', {
		repos: {
			type: Sequelize.STRING
		},
		collaborators: {
			type: Sequelize.ARRAY(Sequelize.INTEGER)
		},
		commits: {
			type: Sequelize.INTEGER
		},
		branches: {
			type: Sequelize.INTEGER
		},

	});

};