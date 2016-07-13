var router = require('express').Router();
var User = require('../api/users/user.model.js');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// router.get('/login', function(req, res, next){
//   console.log('we have a req');
//   res.send('hello')
// })

passport.use(new GoogleStrategy({
    clientID: '1007020906425-mdk8k1nd2vhgaso1jnauk679v3kcvi8q.apps.googleusercontent.com',
    clientSecret: 'uQKiMDJPMti8GC_p16HPwzLD',
    callbackURL: "http://localhost:8080/auth/google/callback"
  },
  function(token, tokenSecret, profile, done) {

    User.findOrCreate({
      where: {
        googleId: profile.id,
        name: profile.name.givenName + ' ' + profile.name.familyName,
        email: profile.emails[0].value
      }
    })
    .spread(function(user, created){
      done(null, user)
    })

  }
));



router.get('/google', passport.authenticate('google', { scope : 'email' }));

router.get('/google/callback',
  passport.authenticate('google', {
    successRedirect : '/', // or wherever
    failureRedirect : '/fail' // or wherever
  })
);

router.get('/me', function(req, res, next){
  var sessionId = req.sessionID;
  var sessionStore = req.sessionStore.sessions
  console.log(req)
  if(req.user) res.send(req.user);
  else {
    console.log('NO REQ.USER')
    if(sessionStore[sessionId]){
      console.log(sessionStore[sessionId]);
      res.send(sessionStore[sessionId])
    } else{
      res.status(401).end()
    }
  }

})

router.get('/logout', function(req, res, next){
    req.session.destroy()
    res.end();
});

router.post('/login', function(req, res, next){
  var email = req.body.email;
  var password = req.body.password;
  User.findOne({
    where: {
      email: email
    }
  })
  .then(function(user){
    if(user){
      req.session.user = user;
      res.status(200).send(user);
    }
    else res.send(401)
  })
  .catch(next)
})

router.post("/signup", function(req, res, next){
  var email = req.body.email;
  var password = req.body.password;
  var name = req.body.name;
  var phoneNumber = req.body.phoneNumber

  User.create({
    email: email,
    password: password,
    name: name,
    phone: phoneNumber
  })
  .then(function(user){
    res.send(user);
  })
  .catch(next)
})

module.exports = router;
