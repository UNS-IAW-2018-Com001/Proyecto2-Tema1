const mongoose = require('mongoose');
const preferencia = mongoose.model('preferenciasUsuario');

const getPreferencias=function(req,res){
  var id_usuario=req.param("user_id");
  preferencia.find({"idUser":id_usuario}).exec((err, preferencia) => {
  res.status(200).jsonp({stylesheet:preferencia.css});
  })
};


const postPreferencias=function(req,res){
  //preferencia.remove({"idUser":req.body.elemento.idUser},function (err){});
  preferencia.collection.insert([req.body.elemento],onInsert);
  //res.status(200).jsonp(req.body.elemento);
  res.save(req.body);
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
