const router = require("express").Router();
const User = require("../models/User.model");

const bcryptjs = require('bcryptjs')

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/login", (req, res) => {
  res.render('users/login')
})

router.post('/login-the-user', (req, res) => {

  User.findOne({ username: req.body.username }).then((user) => {
    if (!user) {
      res.send('user not found')
    }
    //user.password // from db (hashed)
    //req.body.password // from browser
    if (bcryptjs.compareSync(req.body.password, user.passwordHash)) {
      req.session.currentUser = user
      res.redirect('/')
    } else {
      res.send('password not correct')
    }
  })

})

router.get('/private', (req, res) => {
  if (!req.session.currentUser) {
    res.redirect('/')
  } else {
    res.send('some information only for logged in users')
  }
})

module.exports = router;

