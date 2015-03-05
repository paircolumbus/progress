var async = require('async');
var challenges = require('./challenges');
var request = require('request');

function githubRequest(pathname, callback) {
  request({
    url: 'https://api.github.com' + pathname,
    headers: {
      Accept: 'application/vnd.github.v3',
      'User-Agent': 'request'
    },
    json: true,
    qs: {
      client_id: process.env.PROGRESS_ID,
      client_secret: process.env.PROGRESS_SECRET
    }
  }, function (error, response, body) {
    if (body.message) {
      callback(new Error(body.message), body);
    } else {
      callback(error, body);
    }
  });
}

function getCategoryProgress(user, category, callback) {
  async.map(category.challenges, function (challenge, callback) {
    getProgress(user, challenge, callback);
  }, function (error, challenges) {
    if (error) {
      callback(error);
    } else {
      callback(error, {
        category: category.category,
        challenges: challenges
      });
    }
  });
}

function getOverallProgress(user, callback) {
  async.map(challenges, function (category, callback) {
    getCategoryProgress(user, category, callback);
  }, callback);
}

function getProgress(user, challenge, callback) {
  githubRequest('/repos/paircolumbus/' + challenge + '/pulls', function (error, body) {
    if (error) {
      callback(error);
    } else {
      callback(error, {
        challenge: challenge,
        complete: body.some(function (pull) {
          return pull.user.login === user;
        })
      });
    }
  });
}

module.exports = {
  getCategoryProgress: getCategoryProgress,
  getOverallProgress: getOverallProgress,
  getProgress: getProgress
};
