var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

// var User = db.Model.extend({
//   tableName: 'users',
//   hasTimestamps: true,
//   initialize: function() {
//     this.on('creating', this.hashPassword);
//   },
//   comparePassword: function(attemptedPassword, callback) {
//     bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
//       callback(isMatch);
//     });
//   },
// });
var userSchema = db.Schema({
  id: Number,
  username: String,
  password: String,
  timestamp: { type: Date, default: Date.now }
});

userSchema.pre('save', function(next) {
  var user = this;
  bcrypt.hash(this.password, null, null, function(err, res) {
    user.password = res;
    next();
  });
});

var User = db.model('User', userSchema);

User.comparePassword = function(attemptedPassword, callback) {
  bcrypt.compare(attemptedPassword, this.password, function(err, isMatch) {
    callback(isMatch);
  });
};

module.exports = User;
