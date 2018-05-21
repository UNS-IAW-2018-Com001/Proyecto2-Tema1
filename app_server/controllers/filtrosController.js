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
  //  var gruposFiltrados=[];
    var ramasFiltradas=[];  
    //$.each(filtroRama, function (index, rama) {
     // var queryGrupo=Grupo.find({"_id":rama.GrupoPerteneciente});
 //     if(filtros["Religion"])
//        queryGrupo.where('religion').equals(filtros["Religion"]);
      //queryGrupo.exec((err, grupo) => {
        //console.log(grupo);
    //    ramasFiltradas.push(rama);
  //      gruposFiltrados.push(grupo);
    // });

    //});
    for(var rama in filtroRama){
      var queryGrupo=Grupo.find({"_id":filtroRama[rama].GrupoPerteneciente});
      if(filtros["Religion"])
        queryGrupo.where('religion').equals(filtros["Religion"]);
      queryGrupo.exec((err, grupo) => {
        if(grupo){
        console.log("Rama: "+filtroRama[rama].nombre+", Grupo:"+grupo);
        }
      });
    }
    res.status(200).jsonp(filtroRama);
  });
};

module.exports = {
  calcularFiltros
};
