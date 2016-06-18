'use strict';

var passport = require('passport');
var GithubStrategy = require('passport-github2').Strategy;

module.exports = function(app, db) {

	var User = db.model('user');
	var Github = db.model('github');

	var githubConfig = app.getValue('env').GITHUB;

	var githubCredentials = {
		clientID: githubConfig.clientID,
        clientSecret: githubConfig.clientSecret,
        callbackURL: githubConfig.callbackURL,
        passReqToCallback: true
	}

	var verifyCallback = function(req, accessToken, refreshToken, profile, done) {

		// Create Github
		// Keep data, but update / (delete) association

		var sessionUser = req.user.dataValues;

		if (!req.user) {
			var err = new Error('You must be signed in to use the app!');
			err.status = 401;
			done(err);
		} else {
			Github.findOrCreate({
				where: {
					id: profile.id
				},
				defaults: {
					accessToken: accessToken
				}
			})
			.spread(function(github, created) {
				User.findById(req.user.id, {
					include: [Github]
				})
				.then(function(user) {
					var input = user.githubId ? null : github;
					user.setGithub(input)
					.then(function(user) {
						console.log('User: ', user);
						done(null, user);
					})
					.catch(done);
				})
				.catch(done);
			})
			.catch(done);
		}
		
    };

	passport.use(new GithubStrategy(githubCredentials, verifyCallback));

	app.get('/auth/github', passport.authorize('github', { scope: [ 'user:email', 'repo' ] }));

	app.get('/auth/github/callback', passport.authorize('github', {
		successRedirect: '/',
		failureRedirect: '/' 
	}));
}