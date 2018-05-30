
function cargarArchivoCSS(){
    document.getElementById('cssArchivo').href = "/stylesheets/Formato2.css";
}
function guadarCSSActual(){
    $.get("./api/preferenciasUsuario?user_id="+dataUser.id, function (data) {
      if(data!=null){
        document.getElementById('cssArchivo').href=data.css;
      }
    else{
      var archivo=document.getElementById('cssArchivo').href;
      var elemento_nuevo={idUser:dataUser.id,css:archivo};
      guardar('./api/preferenciasUsuario',elemento_nuevo);
    }
  });
}

function cambiarArchivoCss(archivo) {
    document.getElementById('cssArchivo').href = archivo;
    FB.getLoginStatus(function(response){
    if(response.status=='connected') {
      var elemento_nuevo={idUser:dataUser.id,css:archivo};
      guardar('./api/preferenciasUsuario',elemento_nuevo);
    }
    });
}
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
    getFiltros('./api/filtros/grupos',filtrosUsados);
    return mensaje;
}

function getFiltros(ruta,elemento_nuevo) {
  //const jsonString = JSON.stringify(Array.from(comentario.values()));
  $.ajax({
      url: ruta,
      type: 'POST',
      data: JSON.stringify({filtros: elemento_nuevo}),
      contentType: "application/json",
      dataType: "json",
      success: function(data){
        console.log(data);
      },
      error:function(data){ }
  });
}
$(document).on("click","#botonFiltro", function(){
        filtrar();
});
