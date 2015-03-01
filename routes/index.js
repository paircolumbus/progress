var express = require('express');
var router = express.Router();

var progress = require('../progress');

/* GET home page. */
router.get('/', function(req, res, next) {
  progress.getProgressAll(function (error, results) {
    if (error) {
      next(error);
    } else {
      res.render('index', { results: results });
    }
  });
});

module.exports = router;
