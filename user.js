var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/progress');

module.exports = mongoose.model('User', {
  name: String,
  completed: Number
});
