const passport = require('passport');
const mongoose = require('mongoose');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../models/user_social');


// Configuración del autenticado con google+
passport.use(new GoogleStrategy({
    consumerKey: "973282334177-jrq5gjurmq6osdsp1nebk2hrle2c46gl.apps.googleusercontent.com",
    consumerSecret: "w_NxAjggdOwbrZ0m90Y3knIy",
    callbackURL: "https://scoutsenargentina.herokuapp.com/auth/google/callback"
  },
  function(token, tokenSecret, profile, done) {
      User.findOrCreate({ provider_id: profile.id }, function (err, user) {
				if(err) throw(err);
				// Si existe en la Base de Datos, lo devuelve
				if(!err && user!= null) return done(null, user);

				// Si no existe crea un nuevo objecto usuario
				var user = new User({
					provider_id	: profile.id,
					provider		 : profile.provider,
					name				 : profile.displayName,
					photo				: profile.photos[0].value,
					css 				: 	"sin_estilo"
				});
				//...y lo almacena en la base de datos
				user.save(function(err) {
					if(err) throw err;
					done(null, user);
				});
			});
  }));



  passport.serializeUser(function(user, cb) {
    cb(null, user);
  });

  passport.deserializeUser(function(user, cb) {
    cb(null, user);
  });




module.exports = passport;
