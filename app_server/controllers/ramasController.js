const mongoose = require('mongoose');
const Rama = mongoose.model('ramas');


/* GET home page */
const getRamas = function(req, res){
  var id_grupo=req.param("id_grupo");

  Rama.find({"GrupoPerteneciente":id_grupo}).exec((err, Rama) => {
    res.status(200).jsonp(Rama);
  })
};

module.exports = {
  getRamas
}; 
