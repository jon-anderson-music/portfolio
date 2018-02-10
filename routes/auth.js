const express = require('express');
const router = express.Router();
const passport = require('passport');

const User = require('../models/User')

router.get('login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/admin/loggedin',
  failureRedirect: '/admin/'
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res, next) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password
  })
  user.save((err) => {
    if (err) {
      console.error('There was an error saving the user', err)
    }
    next()
  })
}, passport.authenticate('local', {
  successRedirect: '/admin/loggedin'
}))

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/login')
})

module.exports = router;
