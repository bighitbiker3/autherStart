'use strict';

var app = require('express')();
var path = require('path');
var session = require('express-session');
var passport = require('passport');
var User = require('../api/users/user.model.js');

app.use(require('./logging.middleware'));

app.use(require('./request-state.middleware'));



app.use(session({
  secret: 'helloworld',
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next){
  // console.log('user', req.user);
  next();
});


passport.serializeUser(function(user, done){
  done(null, user.id)
});

passport.deserializeUser(function (id, done) {
  User.findById(id)
  .then(function (user) {
    done(null, user);
  })
  .catch(function (err) {
    done(err);
  });
});

// app.use(function (req, res, next) {
//   console.log('session', req.session);
//   next();
// });

app.use('/api', function (req, res, next) {
  if (!req.session.counter) req.session.counter = 0;
  console.log('counter', ++req.session.counter);
  next();
});

app.use('/auth', require('../authentication/router.js'));

app.use('/api', require('../api/api.router'));

app.use(require('./statics.middleware'));

var validFrontendRoutes = ['/', '/stories', '/users', '/stories/:id', '/users/:id', '/signup', '/login'];
var indexPath = path.join(__dirname, '..', '..', 'public', 'index.html');
validFrontendRoutes.forEach(function (stateRoute) {
  app.get(stateRoute, function (req, res) {
    res.sendFile(indexPath);
  });
});

app.use(require('./error.middleware'));

module.exports = app;
