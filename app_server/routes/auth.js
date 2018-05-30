var express = require('express');
var router = express.Router();

const passport = require('../auth/auth_fb');


router.get('/logout/facebook', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/login/facebook', passport.authenticate('facebook', { scope: ['public_profile']}));
router.get('/auth/facebook/callback',
passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');

  });


  module.exports = router;