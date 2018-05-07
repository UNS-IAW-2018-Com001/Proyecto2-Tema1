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
  Comentario.update({_id: req.user._id},  req.body,
-  			{upsert: true, setDefaultsOnInsert: true}, (err, comentario) => {
-  				if (err) {
-  					res
-  						.status(400)
-  						.json(err);
-  	        	} else {
-  					res
-  						.status(201)
-  						.json(comentario);
-  				}
-  			})
};


module.exports = {
  getComentarios,
  postComentarios
};
