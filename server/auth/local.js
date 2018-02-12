const router = require('express').Router();
const { Story, User } = require('../db/models');

// make sure this comes after the session middleware, otherwise req.session will not be available!!
router.put('/login', function (req, res, next) {
  const { email, password } = req.body
  User.findOne({
    where: { email, password }
  })
  .then(function (user) {
    if (!user) throw HttpError(404);
    else {
      req.session.userId = user.id;
      //res.send(user) //just a test for postman
      res.end(); // 200 is the default statues!
    }
  })
  .catch(next);
});

module.exports = router;