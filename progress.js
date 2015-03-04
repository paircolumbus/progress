var async = require('async');
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

function getProgressAll(user, callback) {
  githubRequest('/orgs/paircolumbus/repos', function (error, repos) {
    if (error || !repos) {
      callback(error);
    } else {
      var challenges = repos.map(function (repo) { return repo.name; });
      async.map(challenges, function (challenge, callback) {
        getProgress(user, challenge, callback);
      }, callback);
    }
  });
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
  getProgress: getProgress,
  getProgressAll: getProgressAll
};
