var express = require('express');
var path = require('path');
var logger = require('morgan');

var app = express();
var progress = require('./progress');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

// view helpers
app.locals.colorClass = function (result) {
  return 'text-' + (result ? 'success' : 'danger');
};
app.locals.iconClass = function (result) {
  return 'glyphicon-' + (result ? 'ok' : 'remove');
};

/* GET home page. */
app.get('/', function(req, res, next) {
  if (req.query.user) {
    res.redirect('/' + req.query.user);
  } else {
    res.render('index');
  }
});
app.get('/:user', function(req, res, next) {
  progress.getProgressAll(req.params.user, function (error, results) {
    if (error) {
      next(error);
    } else {
      res.render('index', { results: results, user: req.params.user });
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
