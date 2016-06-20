'use strict';
var db = require('./_db');

require('./models/user')(db);
require('./models/connection')(db);
require('./models/fitbit')(db);
require('./models/github')(db);
require('./models/runkeeper')(db);
require('./models/slack')(db);
require('./models/github/githubAccount')(db);
require('./models/github/githubData')(db);

var User = db.model('user');
var Connection = db.model('connection');
var GithubAccount = db.model('githubAccount');
var GithubData = db.model('githubData');
var Fibit = db.model('fitbit');
var Github = db.model('github');
var Runkeeper = db.model('runkeeper');
var Slack = db.model('slack');

User.hasMany(Fibit);
User.hasMany(Github);
User.hasMany(Runkeeper);
User.hasMany(Slack);

User.belongsTo(GithubAccount, { foreignKey: 'githubId' });
GithubAccount.belongsTo(GithubData, { foreignKey: 'githubDataId' });

module.exports = db;