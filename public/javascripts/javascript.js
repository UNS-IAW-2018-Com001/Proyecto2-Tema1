
function cargarArchivoCSS(){
    document.getElementById('cssArchivo').href = "/stylesheets/Formato2.css";
}
function guadarCSSActual(){
  $("#filtros").append("<h1>A200</h1>");

    $.get("./api/preferenciasUsuarios?user_id="+dataUser.id, function (err, data) {
       if(err){
         var archivo=document.getElementById('cssArchivo').href;
         var elemento_nuevo={idUser:dataUser.id,css:archivo};
         $("#filtros").append("<h1>Antes de guardar pref"+JSON.stringify(elemento_nuevo)+"</h1>");
         guardar('./api/preferenciasUsuarios',elemento_nuevo);
         $("#filtros").append("<h1>Despues de guardar pref"+JSON.stringify(elemento_nuevo)+"</h1>");
       }else{
            $("#filtros").append("<h1>Antes de post Status 200</h1>");
            document.getElementById('cssArchivo').href=data.stylesheet;
            $("#filtros").append("<h1>Despues de post Status 200</h1>");
        }
    });
}

function cambiarArchivoCss(archivo) {
    document.getElementById('cssArchivo').href = archivo;
    var elemento_nuevo={idUser:dataUser.id,css:archivo};
    guardar('./api/preferenciasUsuarios',elemento_nuevo);
}
