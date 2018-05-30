const passport = require('passport');
const mongoose = require('mongoose');
var Strategy = require('passport-facebook').Strategy;
var User = require('../models/user');

passport.use(new Strategy({
    clientID: '211557066103646',
    clientSecret: '67725dcbcdea15b5ab166a0e8088ae84',
    callbackURL: "https://scoutsenargentina.herokuapp.com/auth/facebook/callback"
      },
      function(accessToken, refreshToken, profile, done) {
         //check user table for anyone with a facebook ID of profile.id
        User.findOne({
            'facebookid': profile.id
        }, function(err, user) {
            if (err) {
                return done(err);
            }
            //found user. Return
            return done(null, user);

        });
      }));

      passport.serializeUser(function(user, cb) {
        cb(null, user);
      });

      passport.deserializeUser(function(user, cb) {
        cb(null, user);
      });


module.exports = passport;
