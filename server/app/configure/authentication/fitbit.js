'use strict';

var passport = require('passport');
var FitbitStrategy = require( 'passport-fitbit-oauth2' ).FitbitOAuth2Strategy;

module.exports = function (app, db) {

    var User = db.model('user');

    var fitbitConfig = app.getValue('env').FITBIT;

    var fitbitCredentials = {
        clientID: fitbitConfig.clientID,
        clientSecret: fitbitConfig.clientSecret,
        callbackURL: fitbitConfig.callbackURL
    };

    passport.use(new FitbitStrategy({
        clientID: fitbitCredentials.clientID,
        clientSecret: fitbitCredentials.clientSecret,
        callbackURL: fitbitConfig.callbackURL
      },
      function(accessToken, refreshToken, profile, done) {
        User.findOrCreate({ fitbitId: profile.id }, function (err, user) {
          return done(err, user);
        });
      }
    ));

    app.get('/auth/fitbit',
      passport.authenticate('fitbit', { scope: ['activity','heartrate','location','profile', 'weight', 'location', 'sleep', 'nutrition'] }
    ));

    app.get( '/auth/fitbit/callback', passport.authenticate( 'fitbit', 
    	{failureRedirect: '/auth/fitbit/failure'}),
    	function(req, res) {
    	    console.log(req.user);
    	    res.redirect('/app.html');
    	}
    );

    app.get('/user', (req, res) => {
	    res.send({
	        token: req.user.token
	    });
	});

};