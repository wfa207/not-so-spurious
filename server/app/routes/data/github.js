var express = require('express');
var router = express.Router();
var rp = require('request-promise');
var db = require('../../../db/_db');
var User = db.model('user');
var GithubAccount = db.model('githubAccount');
var GithubData = db.model('githubData');


router.use('/', function(req, res, next) {
	User.findById(req.user.id, {
		include: [{ model: GithubAccount, include: [GithubData] }]
	})
	.then(function(user) {
		req.user.githubUN = user.githubAccount.username;
		req.user.accessToken = user.githubAccount.accessToken;
		next();
	})
	.catch(next);
});

router.get('/', function(req, res, next) {
	var user = req.user
	var githubUN = user.githubUN;
	var accessToken = user.accessToken;

	function genReqOptions(dataType, repoName) {
		var host = 'https://api.github.com';

		var dataPaths = {
			repos: '/users/' + githubUN + '/repos',
			collaborators: '/repos/' + githubUN + '/' + repoName + '/collaborators',
			commits: '/repos/' + githubUN + '/' + repoName + '/commits',
			branches: '/repos/' + githubUN + '/' + repoName + '/branches',
		}

		var dataUrl = host + dataPaths[dataType];

		return {
			url: dataUrl,
			qs: {
				access_token: accessToken
			},
			headers: {
				'User-Agent': 'not-so-spurious-correlations'
			},
			json: true,
			simple: false
		}
	}

	function getData(dataType, repoName) {
		var options = genReqOptions(dataType, repoName);

		return rp(options)
		.then(function(response) {
			return response;
		})
		.catch(next);
	};

	getData('repos')
	.then(function(repos) {
		res.json(repos);
		var updatingRepos = repos.map(function(repo) {
			var dataFields = ['collaborators', 'commits', 'branches'];
			var gettingDataFields = dataFields.map(function(dataField) {
				return getData(dataField, repo.name)
				.then(function(repoData) {
					if (!repoData.message) {
						return { [dataField]: repoData }
					}
				})
				.catch(next);
			});

			return Promise.all(gettingDataFields)
			.then(function(dataFieldArr) {
				dataFieldArr.forEach(function(dataFieldObj) {
					var key = Object.keys(dataFieldObj)[0];
					repo[key] = dataFieldObj[key];
				});
				return repo;
			})
			.catch(next);
		});

		return Promise.all(updatingRepos)
		.then(function(repos) {
			repos.forEach(function(repo) {
				GithubData.findOrCreate({
					where: {
						id: repo.id
					},
					defaults: {
						repoName: repo.name,
						collaborators: repo.collaborators.length,
						commits: repo.commits.length,
						branches: repo.branches.length
					}
				})
				.spread(function(output, created) {
					if (!created) {
						output.update(repo)
						.then(function() {
							next();
						})
						.catch(next);
					}
				})
				.catch(next);
			})
		})
		.catch(next);
	})
	.catch(next);
});

module.exports = router;