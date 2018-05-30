function filtrar(){
    var mensaje;
    var filtrosUsados=new Object();
    $("#selectsFiltros div button").each(function(){
        if(!$(this).hasClass("bs-placeholder")){
            filtrosUsados[this.dataset.id]=this.title;   
        }
    });
    if(filtrosUsados["Edad"]){
      filtrosUsados["Edad"]=filtrosUsados["Edad"].split(" ")[0];
    }
    mensaje=JSON.stringify({filtros: filtrosUsados});
    getFiltros(filtrosUsados);
    return mensaje;
}
function borrarFiltro(){
  $('.selectpicker').val('');
  $('.selectpicker').selectpicker('render');
  filtroActivo=false;
}

function getFiltrosGrupos(elemento_nuevo) {
  //const jsonString = JSON.stringify(Array.from(comentario.values()));
  $.ajax({
      url: './api/filtros/grupos',
      type: 'POST',
      data: JSON.stringify({filtros: elemento_nuevo}),
      contentType: "application/json",
      dataType: "json",
      success: function(data){
        console.log(data);
        gruposFiltrados=data;
        filtroActivo=true;
      },
      error:function(data){ }
  });
}
$(document).on("click","#botonFiltro", function(){
        filtrar();
});