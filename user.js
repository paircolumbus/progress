var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/progress');

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
