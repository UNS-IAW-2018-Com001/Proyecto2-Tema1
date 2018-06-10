
function cargarArchivoCSS(){
    document.getElementById('cssArchivo').href = "/stylesheets/Formato2.css";
}


function guadarCSSActual(){
    $.get("./api/user?user_id="+dataUser._id, function (data) {
       var archivo=document.getElementById('cssArchivo').href;
      var elemento_nuevo={provider_id: dataUser.provider_id, provider: dataUser.provider, name : dataUser.displayName, photo: dataUser.photo,css:archivo};

      if(data!=null){
         if(data.css!="sin_estilo"){
           document.getElementById('cssArchivo').href=data.css;
        }
    else guardar('./api/user',elemento_nuevo);

  }else guardar('./api/user',elemento_nuevo);

  });
}




function cambiarArchivoCss(archivo) {
    document.getElementById('cssArchivo').href = archivo;
    if(dataUser !=null) {
      var elemento_nuevo={provider_id: dataUser.provider_id, provider: dataUser.provider, name : dataUser.displayName, photo: dataUser.photo ,css:archivo};
      $("#filtroTag").empty();
      $("#filtroTag").append (elemento_nuevo);
      guardar('./api/user',elemento_nuevo);
    }
}
