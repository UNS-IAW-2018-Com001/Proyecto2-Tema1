const mongoose = require('mongoose');
const user = mongoose.model('user_social');

const getUser=function(req,res){
  var id_usuario=req.param("user_id");
  user.findOne({"_id":id_usuario}).exec((err, preferencia) => {
      res.status(200).json(preferencia);
  })
};


const postUser=function(req,res){
        user.update({provider_id: req.body.elemento.provider_id}, {$set: { css: req.body.elemento.css }}, {upsert: true}, function(err){});
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
