
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
  })
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
    var filtrosUsados=new Array();
    $("#selectsFiltros div button").each(function(){
        if(!$(this).hasClass("bs-placeholder")){
            var filtro= {this.dataset.id:this.title} ;
            filtrosUsados.push(filtro);   
        }
    });
    $("#filtros").append("<h1>"+JSON.stringify(filtrosUsados)+"</h1>");
}
