'use strict';
var db = require('./_db');

require('./models/user')(db);
require('./models/connection')(db);
require('./models/github')(db);

var User = db.model('user');
var Connection = db.model('connection');
var Github = db.model('github');

User.belongsTo(Github);

module.exports = db;