const mongoose = require('mongoose');
const user = mongoose.model('user_social');

const getUser=function(req,res){
  var id_usuario=req.param("user_id");
  user.findOne({"_id":id_usuario}).exec((err, preferencia) => {
      res.status(200).json(preferencia);
  })
};


const postUser=function(req,res){
  user.update({provider_id: req.body.elemento.provider_id}, {provider:  req.body.elemento.provider}, {name :  req.body.elemento.displayName}, {photo:  req.body.elemento.photo} ,{css: req.body.elemento.css},
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
  getUser,
  postUser
};
