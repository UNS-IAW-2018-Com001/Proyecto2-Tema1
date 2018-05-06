var express = require('express');
var router = express.Router();
const ctrlMain = require('../controllers/main');
const ctrlGrupos = require('../controllers/gruposController');
const ctrlRamas = require('../controllers/ramasController');
const ctrlComentarios = require('../controllers/comentariosController');
/* GET home page. */
router.get('/', ctrlMain.index);
router.get('/api/grupos', ctrlGrupos.getGrupos);
router.get('/api/ramas', ctrlRamas.getRamas);
router.get('/api/comentarios', ctrlComentarios.getComentarios);


module.exports = router;
