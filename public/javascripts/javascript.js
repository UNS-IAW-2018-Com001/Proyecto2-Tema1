
function cargarArchivoCSS(){
    $.get("./api/preferenciasUsuarios", function (data) {
       if(data.existe="true"){
            document.getElementById('cssArchivo').href=data.stylesheets;
       }else{
            document.getElementById('cssArchivo').href = "/stylesheets/Formato2.css";
        }
    });
    
    }
}

function cambiarArchivoCss(archivo) {
    document.getElementById('cssArchivo').href = archivo;
    var elemento_nuevo={idUser:dataUser.id,css:archivo}
    guardar('./api/css',elemento_nuevo);;
}
