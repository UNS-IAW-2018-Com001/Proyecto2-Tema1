const passport = require('passport');
const mongoose = require('mongoose');
var Strategy = require('passport-facebook').Strategy;
var User = require('../models/user');

passport.use(new Strategy({
    clientID: "211557066103646",
    clientSecret: "67725dcbcdea15b5ab166a0e8088ae84",
    callbackURL: "http://localhost:3000/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({name: profile.displayName}, {name: profile.displayName,userid: profile.id}, function(err, user) {
      if (err) { return done(err); }
      done(null, user);
    });
  }
));

module.exports = passport;
