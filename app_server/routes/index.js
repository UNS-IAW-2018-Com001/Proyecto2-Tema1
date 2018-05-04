var express = require('express');
var router = express.Router();
const ctrlMain = require('../controllers/main');
const ctrlGrupos = require('../controllers/gruposController');
const ctrlRamas = require('../controllers/ramasController');

/* GET home page. */
router.get('/', ctrlMain.index);
router.get('/api/grupos', ctrlGrupos.getGrupos);
router.get('/api/ramas', ctrlRamas.getRamas);

module.exports = router;
