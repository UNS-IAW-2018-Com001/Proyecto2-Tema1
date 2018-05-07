const mongoose = require('mongoose');
const Comentario = mongoose.model('comentarios');


/* Retorna los comentarios que correspondan al grupo o rama que se obtienen como parametro */
const getComentarios = function(req, res){
  var id_perteneciente=req.param("id");

  Comentario.find({"perteneciente":id_perteneciente}).exec((err, Comentario) => {
    res.status(200).jsonp(Comentario);
  })
};

const postComentarios=function(req,res){
  Comentario.collection.insert([req.body.elemento],onInsert);
  res.send(req.body);
};

function onInsert(err, docs){
    if (err) throw err;
    else {
      console.info('%d success !!!! .',docs.length);
    }
}


module.exports = {
  getComentarios,
  postComentarios
};
