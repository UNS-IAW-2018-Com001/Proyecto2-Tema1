
function cargarArchivoCSS(){
    var resultado = localStorage.getItem("css");
    if (resultado == null) {
        document.getElementById('cssArchivo').href = "/stylesheets/Formato1.css";

    }else {
        document.getElementById('cssArchivo').href = resultado;
        localStorage.setItem('css', resultado);
    }
}

function cambiarArchivoCss(archivo) {
    document.getElementById('cssArchivo').href = archivo;
    localStorage.setItem('css', archivo);
}
