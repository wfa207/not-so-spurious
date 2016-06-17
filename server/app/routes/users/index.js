var express = require('express');
var router = express.Router();
var User = require('../../../db/_db').model('user');

(function(obj) {

	// NEED TO CHANGE: '/'is for ADMINS ONLY
	// obj.param('userId', function(req, res, next, value) {

	// });

	// obj.get('/', function(req, res, next) {

	// });

	obj.post('/', function(req, res, next) {
		User.findOrCreate({
			where: req.body
		})
		.spread(function(user, created) {
			if (!created) {
				throw new Error('User already exists!');
			}
			res.json(user);
		})
		.catch(next);

	});

})(router);

module.exports = router;