const passport = require('passport');
const mongoose = require('mongoose');
var Strategy = require('passport-twitter').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuthStrategy;
var User = require('../models/user_social');

// Configuración del autenticado con Twitter
	passport.use(new Strategy({
		consumerKey		 : "ptdboGkr8BZZR2xJ1JqJw2pol",
		consumerSecret	: "kXwpCuBJb19xVjImB1lj6tH3XF7NrVaHSnXCAMM8scMWHAQii6",
		callbackURL		 : 'https://scoutsenargentina.herokuapp.com/auth/twitter/callback'
	}, function(accessToken, refreshToken, profile, done) {
		// Busca en la base de datos si el usuario ya se autenticó en otro
		// momento y ya está almacenado en ella
		User.findOne({provider_id: profile.id}, function(err, user) {
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
