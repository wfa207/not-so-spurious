'use strict';
var db = require('./_db');

require('./models/user')(db);
require('./models/connection')(db);

module.exports = db;
