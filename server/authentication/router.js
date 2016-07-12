var router = require('express').Router();
var User = require('../api/users/user.model.js')

router.get('/login', function(req, res, next){
  console.log('we have a req');
  res.send('hello')
})

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
      res.send(204);
    }
    else res.send(401)
  })
  .catch(next)
})

module.exports = router;
