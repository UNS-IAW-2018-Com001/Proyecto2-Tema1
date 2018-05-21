const mongoose = require('mongoose');
const Grupo = mongoose.model('grupos');
const Rama = mongoose.model('ramas');


/* Retorna los comentarios que correspondan al grupo o rama que se obtienen como parametro 
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
*/
Array.prototype.unique=function(a){
  return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0
});

const calcularFiltros=function(req,res){
  var filtros= req.body.filtros;

  var queryRamas=Rama.find();
  if(filtros["Sexo"])
    queryRamas.where('tipo').equals(filtros["Sexo"]);
  if(filtros["Edad"]){
    queryRamas.where("edad_minima").lte(filtros["Edad"]);
    queryRamas.where('edad_maxima').gte(filtros["Edad"]);
  }
  queryRamas.exec((err, filtroRama) => {
    var gruposFiltrados=[];
    var ramasFiltradas=[];
    $.each(filtroRama, function (index, filtro) {
      var queryGrupo=Grupo.find({"_id":filtroRama.id_perteneciente});
      if(filtros["Religion"])
        queryGrupo.where('religion').equals(filtros["Religion"]);
      queryGrupo.exec((err, filtroGrupo) => {
        ramasFiltradas.push(filtroRama);
        gruposFiltrados.push(filtroGrupo);
      }
    });
    res.status(200).jsonp(ramasFiltradas);
  })
};

module.exports = {
  calcularFiltros
};
