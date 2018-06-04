var express = require('express');
var router = express.Router();

const ctrlMain = require('../controllers/main');
const ctrlGrupos = require('../controllers/gruposController');
const ctrlRamas = require('../controllers/ramasController');
const ctrlComentarios = require('../controllers/comentariosController');
const ctrlPreferencias = require('../controllers/preferenciasController');
const ctrlFiltros = require('../controllers/filtrosController');
const passportFacebook = require('../auth/auth_social');


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




router.get('/logout/', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/login/twitter', passportFacebook.authenticate('twitter', { scope: ['public_profile']}));
router.get('/auth/twitter/callback',
passportFacebook.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');

  });


  module.exports = router;
