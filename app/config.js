var db = require('mongoose');
db.connect('127.0.0.1:27017/main');

module.exports = db;
