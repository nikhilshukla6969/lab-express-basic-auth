const router = require("express").Router();

const User = require("../models/User.model");


const bcrypt = require('bcryptjs');
const saltRounds = 10;

// ****************************************************************************************
// GET route to display the form to "register" a user
// ****************************************************************************************

// http://localhost:3000/register
router.get('/register', (req, res) => {
  res.render('auth/signup') // res.render needs a filename from inside the views directory
})

// http://localhost:3000/user-create
router.post('/user-create', (req, res) => {

  // generate salt
  const salt = bcrypt.genSaltSync(saltRounds);
  // create a hashed version of the password
  const hash1 = bcrypt.hashSync(req.body.password, salt);

  User.create({ username: req.body.username, passwordHash: hash1 }).then(() => {
    res.redirect('/')
  })


})

module.exports = router;