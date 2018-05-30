const mongoose = require('mongoose');
const Grupo = mongoose.model('grupos');
const Rama = mongoose.model('ramas');

var gruposFiltrados=[];
var ramasFiltradas=[]; 

Array.prototype.unique=function(a){
  return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0
});

const filtrosGrupos=function(req,res){
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
      res.status(200).jsonp(gruposFiltrados);
    });   
  });
}; 
const filtrosRamas=function(req,res){
  var filtros= req.body.filtros;
  var codigo=req.body.cod;

  var queryRamas=Rama.find().where('GrupoPerteneciente').equals(codigo);
  if(filtros["Sexo"])
    queryRamas.where('tipo').equals(filtros["Sexo"]);
  if(filtros["Edad"]){
    queryRamas.where("edad_minima").lte(filtros["Edad"]);
    queryRamas.where('edad_maxima').gte(filtros["Edad"]);
  }
  queryRamas.exec((err, filtroRama) => {
      res.status(200).jsonp(filtroRama);
  });
};
module.exports = {
  filtrosGrupos
};
