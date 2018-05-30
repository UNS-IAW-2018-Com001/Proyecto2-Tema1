const passport = require('passport');
const mongoose = require('mongoose');
var Strategy = require('passport-facebook').Strategy;
var User = require('../models/user');

passport.use(new Strategy({
    clientID: '211557066103646',
    clientSecret: '67725dcbcdea15b5ab166a0e8088ae84',
    callbackURL: "https://scoutsenargentina.herokuapp.com/auth/facebook/callback"
      },
      función ( accessToken , refreshToken , profile , cb ) {
      Usuario . findOrCreate ({facebookId :  perfil.id }, función ( err , usuario ) {
        return  cb (err, usuario);
    });
  }
));

      passport.serializeUser(function(user, cb) {
        cb(null, user);
      });

      passport.deserializeUser(function(user, cb) {
        cb(null, user);
      });


module.exports = passport;
