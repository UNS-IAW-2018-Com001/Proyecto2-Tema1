const passport = require('passport');
const mongoose = require('mongoose');
var Strategy = require('passport-facebook').Strategy;
var User = require('../models/user');

passport.use(new Strategy({
    clientID: '1999374736802788',
    clientSecret: '82f6b86269dc15614bff103657053c19',
    callbackURL: 'https://scoutsenargentina.herokuapp.com/auth/facebook/callback',
    profileFields: ['id','displayName','name','photos']
  },
  function(accessToken, refreshToken, profile, done) {
     //check user table for anyone with a facebook ID of profile.id
    User.findOne({
        'facebookid': profile.id
    }, function(err, user) {
        if (err) {
            return done(err);
        }
        //No user was found... so create a new user with values from Facebook (all the profile. stuff)
        if (!user) {
            user = new User({
                username: profile.displayName,
                facebookid: profile.id,
                photo: profile.photos[0].value,
                //now in the future searching on User.findOne({'facebook.id': profile.id } will match because of this next line
                facebook: profile._json
            });
            user.save(function(err) {
                if (err) console.log(err);
            });
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
