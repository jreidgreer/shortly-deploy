var db = require('mongoose');
db.connect('localhost:27017/main');

module.exports = db;
