const mongoose = require('mongoose');
const Grupo = mongoose.model('grupos');
const Rama = mongoose.model('ramas');


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

    var cantidadRamas=filtroRama.length;
    var idGrupos=[];
    for(var i=0;i<cantidadRamas;i++){
      idGrupos[i]=filtroRama[i].GrupoPerteneciente;
    }
    console.log("idGrupos: "+idGrupos);
    var queryGrupo=Grupo.find({"_id":{$in:idGrupos}});
    if(filtros["Religion"])
        queryGrupo.where('religion').equals(filtros["Religion"]);
    
    queryGrupo.exec((err, gruposFiltrados) => { 
      console.log("gruposFiltrados: "+gruposFiltrados);
      res.status(200).jsonp(gruposFiltrados);
    });   
  });
};
var gruposFiltrados=[];
var ramasFiltradas=[];  
module.exports = {
  calcularFiltros
};
