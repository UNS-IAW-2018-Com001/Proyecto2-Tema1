
function cargarArchivoCSS(){
    $.get("./api/preferenciasUsuarios?user_id="+dataUser.id, function (data) {
       if(data.existe="true"){
            document.getElementById('cssArchivo').href=data.stylesheets;
       }else{
            document.getElementById('cssArchivo').href = "/stylesheets/Formato2.css";
        }
    });

}

function cambiarArchivoCss(archivo) {
    document.getElementById('cssArchivo').href = archivo;
    var elemento_nuevo={idUser:dataUser.id,css:archivo};
    guardar('./api/preferenciasUsuarios',elemento_nuevo);
}

function guadarCSSActual(){
    var archivo=document.getElementById('cssArchivo').href;
    var elemento_nuevo={idUser:dataUser.id,css:archivo};
    guardar('./api/preferenciasUsuarios',elemento_nuevo);
}
