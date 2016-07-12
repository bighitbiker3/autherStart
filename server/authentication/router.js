var router = require('express').Router();
var User = require('../api/users/user.model.js')

// router.get('/login', function(req, res, next){
//   console.log('we have a req');
//   res.send('hello')
// })

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
      console.log('user\n\n\n', user);
      res.status(200).send(user);
    }
    else res.send(401)
  })
  .catch(next)
})

router.post("/signup", function(req, res, next){
  var email = req.body.email;
  var password = req.body.password;

  User.create({
    email: email,
    password: password
  })
  .then(function(user){
    res.send(user);
  })
  .catch(next)
})

module.exports = router;
