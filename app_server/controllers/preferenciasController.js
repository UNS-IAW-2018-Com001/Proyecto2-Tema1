const mongoose = require('mongoose');
const preferencia = mongoose.model('preferenciasUsuario');

const getPreferencias=function(req,res){
  var id_usuario=req.param("user_id");
  preferencia.findOne({"idUser":id_usuario}).exec((err, preferencia) => {
      res.status(200).json(preferencia);
  })
};


const postPreferencias=function(req,res){
  preferencia.update({idUser: req.body.elemento.idUser}, {css: req.body.elemento.css},
  			{upsert: true, setDefaultsOnInsert: true}, (err, pedido) => {
  				if (err) {
  					res.status(400).json(err);
  	        	} else {
  					res.status(200).json(pedido);
  				}
  			})
};

function onInsert(err, docs){
    if (err) throw err;
    else {
      console.info('%d success !!!! .',docs.length);
    }
}


module.exports = {
  getPreferencias,
  postPreferencias
};
