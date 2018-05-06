const mongoose = require('mongoose');
const Rama = mongoose.model('comentarios');


/* Retorna los comentarios que correspondan al grupo o rama que se obtienen como parametro */
const getComentarios = function(req, res){
  var id_perteneciente=req.param("id");

  Rama.find({"perteneciente":id_perteneciente}).exec((err, Comentario) => {
    res.status(200).jsonp(Comentario);
  })
};

module.exports = {
  getComentarios
}; 
