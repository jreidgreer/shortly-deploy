var db = require('../config');
var crypto = require('crypto');

var urlsSchema = db.Schema({
  id: Number,
  url: String,
  baseUrl: String,
  code: String,
  title: String,
  visits: {type: Number, default: 0 },
  timestamp: { type: Date, default: Date.now }
});


urlsSchema.pre('save', function(next) {
  var shasum = crypto.createHash('sha1');
  shasum.update(this.url);
  this.code = shasum.digest('hex').slice(0, 5);
  next();
});

var Link = db.model('Link', urlsSchema);

module.exports = Link;
