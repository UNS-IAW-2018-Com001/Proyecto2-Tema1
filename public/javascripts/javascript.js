
function cargarArchivoCSS(){
    document.getElementById('cssArchivo').href = "/stylesheets/Formato2.css";
}
function guadarCSSActual(){
    $.get("./api/preferenciasUsuarios?user_id="+dataUser.id, function (data) {
       if(data.status="200"){
            document.getElementById('cssArchivo').href=data.stylesheet;
       }else{
            var archivo=document.getElementById('cssArchivo').href;
            var elemento_nuevo={idUser:dataUser.id,css:archivo};
            guardar('./api/preferenciasUsuarios',elemento_nuevo);
        }
    });
}

function cambiarArchivoCss(archivo) {
    document.getElementById('cssArchivo').href = archivo;
    var elemento_nuevo={idUser:dataUser.id,css:archivo};
    guardar('./api/preferenciasUsuarios',elemento_nuevo);
}
