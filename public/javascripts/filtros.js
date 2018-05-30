function getFiltroActual(){
  var filtrosUsados=new Object();
    $("#selectsFiltros div button").each(function(){
        if(!$(this).hasClass("bs-placeholder")){
            filtrosUsados[this.dataset.id]=this.title;   
        }
    });
    if(filtrosUsados["Edad"]){
      filtrosUsados["Edad"]=filtrosUsados["Edad"].split(" ")[0];
    }
    return filtrosUsados;
}
function filtrar(){
    var mensaje;
    var filtrosUsados=getFiltroActual;
    mensaje=JSON.stringify({filtros: filtrosUsados});
    getFiltrosGrupo('./api/filtros/grupos',filtrosUsados);
    return mensaje;
}
function borrarFiltro(){
  $('.selectpicker').val('');
  $('.selectpicker').selectpicker('render');
  filtroActivo=false;
  mostrarGrupo();
}

function getFiltrosGrupo(ruta,elemento_nuevo) {
  //const jsonString = JSON.stringify(Array.from(comentario.values()));
  $.ajax({
      url: ruta,
      type: 'POST',
      data: JSON.stringify({filtros: elemento_nuevo}),
      contentType: "application/json",
      dataType: "json",
      success: function(data){
        console.log(data);
        gruposFiltrados=data;
        filtroActivo=true;
        mostrarGrupo();
      },
      error:function(data){ }
  });
}
$(document).on("click","#botonFiltro", function(){
        filtrar();
});
$(document).on("click","#botonBorrarFiltro", function(){
        borrarFiltro();
});