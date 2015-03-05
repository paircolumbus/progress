# [Progress](http://challengeprogress.herokuapp.com/)
[![Dependency Status](https://gemnasium.com/paircolumbus/progress.svg)](https://gemnasium.com/paircolumbus/progress)
[![Code Climate](https://codeclimate.com/github/paircolumbus/progress/badges/gpa.svg)](https://codeclimate.com/github/paircolumbus/progress)

An easy way to check your progress on [Pair Columbus challenges](https://github.com/paircolumbus/Welcome/blob/master/ChallengeGuide.md). Remember, you don't need to be a member of Pair Columbus to work on the challenges (though if you want to [join us](http://paircolumbus.org/), that would be awesome).

## Features
Enter a GitHub username to see which challenges that user has completed. Progress keeps track of this by assuming that you have completed any challenge that you have submitted a pull request. Please note that this may have false positives if you are contributing to a project, or send a pull request with an incomplete solution. If you need help with a solution you're working on, feel free to ask around on your pull request for that challenge.

## Usage
You should [install Node.js](http://nodejs.org/download/) first.
```shell
npm install
npm start
```
If you run into issues with rate limiting, please [register a new OAuth application on GitHub](https://github.com/settings/applications/new) and set the `PROGRESS_ID` and `PROGRESS_SECRET` environment variables to your client ID and client secret (respectively) before you start the app.
Progress is also deployed on [Heroku](https://www.heroku.com/), which will automatically deploy the app whenever you commit to `master` (and it already has the client ID and client secret set up.

## Stack
These are the technologies used by Progress itself, not the technologies covered in the Pair Columbus challenges.
- [Node.js](http://nodejs.org/)
- [Express](http://expressjs.com/)
- [GitHub API v3](https://developer.github.com/v3/)
- [Bootstrap](http://getbootstrap.com/)
