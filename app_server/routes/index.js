var express = require('express');
var router = express.Router();

const ctrlMain = require('../controllers/main');
const ctrlGrupos = require('../controllers/gruposController');
const ctrlRamas = require('../controllers/ramasController');
const ctrlComentarios = require('../controllers/comentariosController');
const ctrlUser = require('../controllers/userController');
const ctrlFiltros = require('../controllers/filtrosController');
const passport= require('../auth/auth_social');
const passport2= require('../auth/auth_social_google');

/* GET home page. */
router.get('/', ctrlMain.index);
router.get('/api/grupos', ctrlGrupos.getGrupos);
router.get('/api/ramas', ctrlRamas.getRamas);

router.get("/api/user", ctrlUser.getUser);
router.post("/api/user", ctrlUser.postUser);

router.get('/api/comentarios', ctrlComentarios.getComentarios);
router.post("/api/comentarios", ctrlComentarios.postComentarios);

router.post("/api/filtros/grupos", ctrlFiltros.filtrosGrupos);
router.post("/api/filtros/ramas", ctrlFiltros.filtrosRamas);




router.get('/logout/', function(req, res) {
  req.logout();
  res.redirect('/');
});


router.get('/auth/twitter', passport.authenticate('twitter'));
// Ruta de callback, a la que redirigirá tras autenticarse con Twitter.
// En caso de fallo redirige a otra vista '/login'
router.get('/auth/twitter/callback',  passport.authenticate('twitter', { successRedirect: '/',
                                     failureRedirect: '/' }));

router.get('/auth/google', passport2.authenticate('google'));

router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  });

  module.exports = router;
