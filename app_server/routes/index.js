var express = require('express');
var router = express.Router();
const passport = require('../auth/auth_fb');
const ctrlMain = require('../controllers/main');
const ctrlGrupos = require('../controllers/gruposController');
const ctrlRamas = require('../controllers/ramasController');
const ctrlComentarios = require('../controllers/comentariosController');
const ctrlPreferencias = require('../controllers/preferenciasController');
const ctrlFiltros = require('../controllers/filtrosController');
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



router.get('/logout/facebook', function(req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['public_profile']}));
router.get('/auth/facebook/callback',
	passport.authenticate('facebook', { failureRedirect: '/login' }),
 		 function(req, res) {
  		  // Successful authentication, redirect home.
   		 res.redirect('/');

  	});




module.exports = router;
