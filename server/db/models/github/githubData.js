'use strict'
var Sequelize = require('sequelize');
var crypto = require('crypto');
var _ = require('lodash');

module.exports = function(db) {

	db.define('githubData', {
		id: {
			type: Sequelize.STRING,
			primaryKey: true
		},
		repoName: {
			type: Sequelize.STRING
		},
		collaborators: {
			type: Sequelize.INTEGER
		},
		commits: {
			type: Sequelize.INTEGER
		},
		branches: {
			type: Sequelize.INTEGER
		}
	});

};