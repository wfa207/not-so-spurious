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
		contributors: {
			type: Sequelize.STRING
		},
		commits: {
			type: Sequelize.STRING
		},
		codeFrequency: {
			type: Sequelize.STRING
		},
		participation: {
			type: Sequelize.STRING
		},
		punchCard: {
			type: Sequelize.STRING
		}
	});

};