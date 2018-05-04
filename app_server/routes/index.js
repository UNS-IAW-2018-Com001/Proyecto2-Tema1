var express = require('express');
var router = express.Router();
const ctrlMain = require('../controllers/main');
const ctrlGrupos = require('../controllers/gruposController');

/* GET home page. */
router.get('/', ctrlMain.index);
router.get('/api/grupos', ctrlGrupos.getGrupos);

module.exports = router;
