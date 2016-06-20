'use strict';
var db = require('./_db');

require('./models/user')(db);
require('./models/connection')(db);
require('./models/github/githubAccount')(db);
require('./models/github/githubData')(db);

var User = db.model('user');
var Connection = db.model('connection');
var GithubAccount = db.model('githubAccount');
var GithubData = db.model('githubData');

User.belongsTo(GithubAccount, { foreignKey: 'githubId' });
GithubAccount.belongsTo(GithubData, { foreignKey: 'githubDataId' });

module.exports = db;