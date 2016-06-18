var express = require('express');
var router = express.Router();
var _db = require('../../../db/_db');
var User = _db.model('user');
var GitHub = _db.model('github');

(function(obj) {

	obj.param('userId', function(req, res, next, id) {
		var id = id;

		function getData(response) {
			return response.dataValues;
		}

		User.findById(id, {
			include: [
				GitHub
			]
		})
		.then(function(response) {
			return getData(response)
		})
		.then(function(user) {
			req.loggedInUser = user;
			next();
		})
		.catch(next);

	});

	obj.post('/', function(req, res, next) {
		User.findOrCreate({
			where: {
				email: req.body.email
			},
			defaults: {
				password: req.body.password
			}
		})
		.spread(function(user, created) {
			if (!created) {
				var err = new Error('User already exists!');
				throw err;
			}
			res.json(user);
		})
		.catch(next);

	});

	obj.get('/:userId', function(req, res, next) {
		res.json(req.loggedInUser);
	});

})(router);

module.exports = router;