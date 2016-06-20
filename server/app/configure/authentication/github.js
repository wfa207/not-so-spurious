'use strict';

var passport = require('passport');
var GithubStrategy = require('passport-github2').Strategy;
var http = require('http');

module.exports = function(app, db) {

	var User = db.model('user');
	var GithubAccount = db.model('githubAccount');
	var githubConfig = app.getValue('env').GITHUB;

	var githubCredentials = {
		clientID: githubConfig.clientID,
        clientSecret: githubConfig.clientSecret,
        callbackURL: githubConfig.callbackURL,
        passReqToCallback: true
	}

	var verifyCallback = function(req, accessToken, refreshToken, profile, done) {

		var user = req.user;

		console.log('Access Token(prior): ', accessToken);

		var updatedGithubAccount = {
			username: profile.username,
			profileUrl: profile.profileUrl,
			accessToken: accessToken
		};

		if (!user) {
			var err = new Error('You must be signed in to use the app!');
			err.status = 401;
			done(err);
		} else {
			GithubAccount.findOrCreate({
				where: {
					id: profile.id
				},
				defaults: updatedGithubAccount
			})
			.spread(function(githubAccount, created) {
				if (!created) {
					githubAccount.update(updatedGithubAccount);
				}
				User.findById(user.id)
				.then(function(user) {
					user.setGithubAccount(githubAccount)
					.then(function(user) {
						console.log("Access Token: ", accessToken);
						done(null, githubAccount);
					})
					.catch(done);
				})
				.catch(done);
			})
			.catch(done);
		}
		
    };

	passport.use(new GithubStrategy(githubCredentials, verifyCallback));

	app.get('/auth/github', passport.authorize('github', { scope: [ 'user', 'repo' ] }));

	app.get('/auth/github/callback', passport.authorize('github', {
		successRedirect: '/connections',
		failureRedirect: '/connections' 
	}));

	app.get('/unlink/github', function(req, res, next) {
		var member = req.user;

		User.findById(member.id)
		.then(function(member) {
			member.setGithubAccount(null)
			.then(function(member) {
				res.redirect('/connections'); // NEED TO CHANGE
			})
		})
		.catch(next);
	});

}