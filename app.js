var express = require('express');
var path = require('path');
var logger = require('morgan');

var app = express();
var progress = require('./progress');
var User = require('./user');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

/* GET home page. */
app.get('/', function(req, res, next) {
  if (req.query.user) {
    res.redirect('/' + req.query.user);
  } else {
    User.find({}).sort({ completed: -1 }).exec(function (error, users) {
      if (error) {
        next(error);
      } else {
        res.render('index', { total: progress.getTotal(), users: users });
      }
    });
  }
});
app.get('/:user', function(req, res, next) {
  progress.getOverallProgress(req.params.user, function (error, results) {
    if (error) {
      next(error);
    } else if (req.params.user === 'favicon.ico') {
      res.status(404).send('Not found');
    } else {
      User.findOneAndUpdate({
        name: req.params.user
      }, {
        name: req.params.user,
        completed: progress.getCompleted(results)
      }, {
        upsert: true
      }, function (error) {
        if (error) {
          next(error);
        } else {
          res.render('index', {
            completed: progress.getCompleted(results),
            results: results,
            total: progress.getTotal(),
            user: req.params.user
          });
        }
      });
    }
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
