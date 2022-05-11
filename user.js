var mongoose = require('mongoose');

var hosts = process.env.ORMONGO_HOSTS;
var username = process.env.ORMONGO_RS_USER;
var password = process.env.ORMONGO_RS_KEY;
var database = 'paircolumbus-progress';
var options = '?replicaSet=1401d8183bf14817a1caa4671a3c3820&retryWrites=false';

var connectionString = 'mongodb://' + username + ':' + password + '@' + hosts + '/' + database + options;

mongoose.connect(connectionString || 'mongodb://localhost/progress');

module.exports = mongoose.model('User', {
  name: {
    type: String,
    required: true
  },
  completed: {
    type: Number,
    required: true
  }
});
