
function cargarArchivoCSS(){
    document.getElementById('cssArchivo').href = "/stylesheets/Formato2.css";
}
function guadarCSSActual(){
  $("#filtros").append("<h1>A200</h1>");

    $.get("./api/preferenciasUsuario?user_id="+dataUser.id, function (data) {
      if(data.status==200){
        $("#filtros").append("<h1>Antes de post Status 200</h1>");
        document.getElementById('cssArchivo').href=data.css;
        $("#filtros").append("<h1>Despues de post Status 200</h1>");
      }
    else{
      var archivo=document.getElementById('cssArchivo').href;
      var elemento_nuevo={idUser:dataUser.id,css:archivo};
      $("#filtros").append("<h1>Antes de guardar pref"+JSON.stringify(data.status)+"</h1>");
      guardar('./api/preferenciasUsuario',elemento_nuevo);
      $("#filtros").append("<h1>Despues de guardar pref"+JSON.stringify(elemento_nuevo)+"</h1>");
    }
  })
}

function cambiarArchivoCss(archivo) {
    document.getElementById('cssArchivo').href = archivo;
    var elemento_nuevo={idUser:dataUser.id,css:archivo};
    guardar('./api/preferenciasUsuario',elemento_nuevo);
}
