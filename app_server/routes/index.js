var express = require('express');
var router = express.Router();
var passport = require('passport'); // Passport: Middleware de Node que facilita la autenticación de usuarios

const ctrlMain = require('../controllers/main');
const ctrlGrupos = require('../controllers/gruposController');
const ctrlRamas = require('../controllers/ramasController');
const ctrlComentarios = require('../controllers/comentariosController');
const ctrlPreferencias = require('../controllers/preferenciasController');
const ctrlFiltros = require('../controllers/filtrosController');


require('../models/user');
require('.../passport')(passport);

// Configuración de Passport. Lo inicializamos
// y le indicamos que Passport maneje la Sesión
router.use(passport.initialize());
router.use(passport.session());

/* GET home page. */
router.get('/', ctrlMain.index);
router.get('/api/grupos', ctrlGrupos.getGrupos);
router.get('/api/ramas', ctrlRamas.getRamas);

router.get("/api/preferenciasUsuario", ctrlPreferencias.getPreferencias);
router.post("/api/preferenciasUsuario", ctrlPreferencias.postPreferencias);

router.get('/api/comentarios', ctrlComentarios.getComentarios);
router.post("/api/comentarios", ctrlComentarios.postComentarios);

router.post("/api/filtros/grupos", ctrlFiltros.filtrosGrupos);
router.post("/api/filtros/ramas", ctrlFiltros.filtrosRamas);

/* Rutas de Passport */
// Ruta para desloguearse
app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});
// Ruta para autenticarse con Twitter (enlace de login)
app.get('/auth/twitter', passport.authenticate('twitter'));
// Ruta para autenticarse con Facebook (enlace de login)
app.get('/auth/facebook', passport.authenticate('facebook'));
// Ruta de callback, a la que redirigirá tras autenticarse con Twitter.
// En caso de fallo redirige a otra vista '/login'
app.get('/auth/twitter/callback', passport.authenticate('twitter',
  { successRedirect: '/', failureRedirect: '/login' }
));
// Ruta de callback, a la que redirigirá tras autenticarse con Facebook.
// En caso de fallo redirige a otra vista '/login'
app.get('/auth/facebook/callback', passport.authenticate('facebook',
  { successRedirect: '/', failureRedirect: '/login' }
));


  module.exports = router;
