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
    auth: {
      user: process.env.PROGRESS_USER,
      password: process.env.PROGRESS_TOKEN
    }
  }, function (error, response, body) {
    if (body.message) {
      callback(new Error(body.message), body);
    } else {
      callback(error, body);
    }
  });
}

function getCategoryProgress(challenges, user, category, callback) {
  async.map(category.challenges, function (challenge, callback) {
    getProgress(user, challenge, callback);
  }, function (error, challenges) {
    if (error) {
      callback(error);
    } else {
      callback(error, {
        category: category.category,
        description: category.description,
        challenges: challenges
      });
    }
  });
}

function getCompleted(categories) {
  return categories.reduce(function (sum, category) {
    return sum + category.challenges.filter(function (challenge) {
      return challenge.complete;
    }).length;
  }, 0);
}

function getOverallProgress(challenges, user, callback) {
  async.map(challenges, function (category, callback) {
    getCategoryProgress(challenges, user, category, callback);
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

function getTotal(challenges) {
  return challenges.reduce(function (sum, category) {
    return sum + category.challenges.length;
  }, 0);
}

function userExists(user, callback) {
  githubRequest('/users/' + user, function (error, body) {
    if (error) {
      callback(error);
    } else {
      callback(error, body.message !== 'Not Found');
    }
  });
}

module.exports = {
  getCategoryProgress: getCategoryProgress,
  getCompleted: getCompleted,
  getOverallProgress: getOverallProgress,
  getProgress: getProgress,
  getTotal: getTotal,
  userExists: userExists
};
