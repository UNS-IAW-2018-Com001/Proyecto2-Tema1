
function cargarArchivoCSS(){
    document.getElementById('cssArchivo').href = "/stylesheets/Formato2.css";
}
function guadarCSSActual(){
    $.get("./api/preferenciasUsuario?user_id="+dataUser.id, function (data) {
      if(data!=null){

  	        alert("error "+JSON.stringify(data));
        document.getElementById('cssArchivo').href=data.css;

      }
    else{
      var archivo=document.getElementById('cssArchivo').href;
      var elemento_nuevo={idUser:dataUser.id,css:archivo};
      guardar('./api/preferenciasUsuario',elemento_nuevo);
    }
  })
}

function cambiarArchivoCss(archivo) {
    document.getElementById('cssArchivo').href = archivo;
    var elemento_nuevo={idUser:dataUser.id,css:archivo};
    guardar('./api/preferenciasUsuario',elemento_nuevo);
}
