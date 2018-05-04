const mongoose = require('mongoose');
const Grupo = mongoose.model('grupos');


/* GET home page */
const getGrupos = function(req, res){
  Grupo.find().exec((err, Grupo) => {
    res.status(200).jsonp(Grupo);
  })
};

module.exports = {
  getGrupos
}; 
