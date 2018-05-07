
function cargarArchivoCSS(){
    document.getElementById('cssArchivo').href = "/stylesheets/Formato2.css";
}
function guadarCSSActual(){
    $.get("./api/preferenciasUsuarios?user_id="+dataUser.id, function (data) {
       if(data.status="200"){
            $("#filtros").append("<h1>Antes de post Status 200"</h1>");
            document.getElementById('cssArchivo').href=data.stylesheet;
            $("#filtros").append("<h1>Despues de post Status 200"</h1>");
       }else{

            var archivo=document.getElementById('cssArchivo').href;
            var elemento_nuevo={idUser:dataUser.id,css:archivo};
            $("#filtros").append("<h1>Antes de guardar pref"+JSON.stringify(elemento_nuevo)+"</h1>");
            guardar('./api/preferenciasUsuarios',elemento_nuevo);
            $("#filtros").append("<h1>Despues de guardar pref"+JSON.stringify(elemento_nuevo)+"</h1>");

        }
    });
}

function cambiarArchivoCss(archivo) {
    document.getElementById('cssArchivo').href = archivo;
    var elemento_nuevo={idUser:dataUser.id,css:archivo};
    guardar('./api/preferenciasUsuarios',elemento_nuevo);
}
