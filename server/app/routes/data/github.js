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

function errorHandler(err) {

}

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
			json: true
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
		return repos.map(function(repo) {
			var dataFields = ['collaborators', 'commits', 'branches'];
			var gettingDataFields = dataFields.forEach(function(dataField) {
				return getData(dataField, repo.name)
				.then(function(repoData) {
					repo[dataField] = repoData;
					return repo;
				})
				.catch(next);
			});
		})
	})

			// return Promise.all(gettingDataFields)
			// .then(function(updatedRepos) {
			// 	console.log('updated repos: ', updatedRepos);
			// 	res.json(updatedRepos);
			// 	return updatedRepos;
			// })
			// .catch(next)
	// })
	.catch(next);

});

module.exports = router;