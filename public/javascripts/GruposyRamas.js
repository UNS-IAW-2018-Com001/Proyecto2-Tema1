var datos;
var ramas;
var codigo;
var enGrupo;
var comentarioGrupos;
var comentarioRama;
var dataUser;


$(function () {
    $.get("./api/grupos", function (data) {
       datos = data;
      $('#panelInfo').hide();
       $('#panel-nuevoComentario').hide();
       initMap();
    });

$(document).on("click",".Botongrupos", function(){
      var id_grupo= $(this).attr('id');
        mostrarRama(id_grupo);
        cargarComentarioGrupo(id_grupo);
    });

$(document).on("click",".Botonramas", function(){
      var id_rama= $(this).attr('id');
      cargarComentarioRama(id_rama);
    });

    //funciones relacionadas al boton principal de gruposyRamas

$(document).on("click","#id_grupo", function(){
        mostrarGrupo();

    });

//login facebook
$.ajax({
        url: '//connect.facebook.net/es_ES/all.js',
        dataType: 'script',
        cache: true,
        success: function() {
          FB.init({
        appId: '211557066103646',
        xfbml: true
      });
      FB.Event.subscribe('auth.authResponseChange', function(response) {
        habilitarComentario();
        if (response && response.status == 'connected') {
          FB.api('/me', function(response) {
            dataUser=response;

            guadarCSSActual();
          });
        }else
            dataUser=null;
      });
      }
    });


});

//funcion relacionada a cada uno de los botones de grupo

function cargarComentarioGrupo(nombre_cod) {
  $.get("./api/comentarios?id="+nombre_cod, function (data) {
        comentarioGrupos=data;
        mostrarInfoGrupo(nombre_cod);
        });
}

function cargarComentarioRama(nombre_cod) {
  $.get("./api/comentarios?id="+nombre_cod, function (data) {
        comentarioRama=data;
        mostrarInfoRama(nombre_cod);
        });
}


function mostrarGrupo() {
    seleccionarTabGrupo();
    $("#gruposyRamas").empty();
    $.each(datos, function (index, grupo) {
        agregarGrupo(grupo);
    });
   $('#panelInfo').hide();

}


function mostrarRama(nombre_cod) {
   $.get("./api/ramas?id_grupo="+nombre_cod, function (data) {
        ramas=data;
      crearGaleria(obtenerImagenesGrupo(nombre_cod));
      seleccionarTabRama();
        var raw;
        $("#gruposyRamas").empty();
        $.each(ramas, function (index, rama) {
                raw = $("<button type=\"button\" class=\"list-group-item Botonramas\" id=\"" + rama._id + "\"></button>").text(rama.nombre);
                $("#gruposyRamas").append(raw);
          });
    });

}


function agregarGrupo(grupo) {
    var nombre = $("<button type=\"button\" class=\"list-group-item Botongrupos\" id=\""+grupo._id +"\" ></button>").text(grupo.nombre);
    $("#gruposyRamas").append(nombre);

}

function mostrarInfoGrupo(nombre_cod) {
     codigo = nombre_cod;
    enGrupo = true;
    $('#panelInfo').show();
    $.each(datos, function (index, grupo) {
        if (nombre_cod == (grupo._id)) {
            $("#boddy2").empty();
            $("#boddy2").append("<dt>Nombre grupo:</dt>");
            $("#boddy2").append($("<dd></dd>").text(grupo.nombre));

            $("#boddy2").append("<dt>Código:</dt>");
            $("#boddy2").append($("<dd></dd>").text(grupo.codigo));

            $("#boddy2").append("<dt>Direccion:</dt>");
            $("#boddy2").append($("<dd></dd>").text(grupo.ubicacion.calle+" "+grupo.ubicacion.numero));

                      //  $("#boddy2").append("<dt>Direccion:</dt>");
            $("#boddy2").append($("<dd></dd>").text(grupo.ubicacion.ciudad+" "+grupo.ubicacion.pais));

            $("#boddy2").append("<dt>Fecha de creación:</dt>");
            $("#boddy2").append($("<dd></dd>").text(grupo.fecha_Creacion));

            $("#boddy2").append("<dt>Horario inicio:</dt>");
            $("#boddy2").append($("<dd></dd>").text(grupo.horario_Inicio));

            $("#boddy2").append("<dt>Horario finalización:</dt>");
            $("#boddy2").append($("<dd></dd>").text(grupo.horario_fin));

            $("#boddy2").append("<dt>Sitio web:</dt>");
            $("#boddy2").append($("<dd></dd>").text(grupo.sitio_web));

            $("#boddy2").append("<dt>Telefono:</dt>");
            $("#boddy2").append($("<dd></dd>").text(grupo.telefono));

            $("#boddy2").append("<dt>Email:</dt>");
            $("#boddy2").append($("<dd></dd>").text(grupo.email));

            $("#boddy2").append("<dt>Religion:</dt>");
            $("#boddy2").append($("<dd></dd>").text(grupo.religion));

            centrarMapa(grupo.ubicacion.coords[0],grupo.ubicacion.coords[01]);
            map.setZoom(15);

             $("#Panel_Titulo").empty();
             $("#Panel_Titulo").append("Informacion del grupo: "+grupo.nombre);


            $("#Titulo_Comentario").empty();
            $("#Titulo_Comentario").append("Comentarios del grupo:");

            $("#comments-list").empty();


            habilitarComentario();
             if(isEmpty(comentarioGrupos)){
                    $("#Titulo_Comentario").append($("<h3></h3>").text("Todavia no hay comentarios. Se el primero en comentar!"));
                }
                else{
                    $("#Titulo_Comentario").empty();
                    $("#Titulo_Comentario").append("Comentarios del grupo:");
                }
            //Cargamos comentarios de cada uno de los grupos
            $.each(comentarioGrupos, function (index, comentario) {
                mostrarComentarios(comentario);

            });

        }
    });

}
function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}
function habilitarComentario(){
  FB.getLoginStatus(function(response){
  if(response.status=='connected') {
    $('#warningComentario').hide();
    $('#nuevoComentario').prop('disabled', false);
  }
  else {
      $('#warningComentario').show();
      $('#nuevoComentario').prop('disabled', true);
  }
  });
}

function mostrarComentarios(comentario) {
  var img;
  if(comentario.imagen==undefined)img= "/images/avatar.png";
  else img=comentario.imagen;

    $("#comments-list").append("<li>" +
            "<div class=\"comment-main-level\">" +
            "<div class=\"comment-avatar\"><img src=\""+img+"\" alt=\"\"></div>" +
            "<div class=\"comment-box\" id=\"commentbox\">" +
            "<div class=\"comment-head\">" +
            "<h6 class=\"comment-name \">" +
            comentario.id
            + "</h6>"
            + "<span id=\"span_Coment\">" + comentario.fecha + "</span>"
            + "<span id=\"span_Coment\">" + comentario.horario + "</span>"
            + "<i class=\"fa fa-reply\"></i>"
            + "<i class=\"fa fa-heart\"></i>"
            + "</div>"
            + "<div class=\"comment-content\">"
            + comentario.texto
            + "</div>"
            + "</div>"
            + "</div>"
            + "</li>");
}

function mostrarInfoRama(num) {
     codigo = num;
    enGrupo = false;
    $.each(ramas, function (index, rama) {
           if (num == rama._id) {
                $("#boddy2").empty();
                $("#boddy2").append("<dt>Nombre rama:</dt>");
                $("#boddy2").append($("<dd></dd>").text(rama.nombre));
                $("#boddy2").append("<dt>Tipo:</dt>");
                $("#boddy2").append($("<dd></dd>").text(rama.tipo));
                $("#boddy2").append("<dt>Edad minima:</dt>");
                $("#boddy2").append($("<dd></dd>").text(rama.edad_minima));
                $("#boddy2").append("<dt>Edad maxima:</dt>");
                $("#boddy2").append($("<dd></dd>").text(rama.edad_maxima));
                $("#boddy2").append("<dt>Fecha inicio inscripcion:</dt>");
                $("#boddy2").append($("<dd></dd>").text(rama.fechaInscripcion_inicio));
                $("#boddy2").append("<dt>Fecha cierre inscripcion:</dt>");
                $("#boddy2").append($("<dd></dd>").text(rama.fechaIscripcion_fin));

                crearGaleria(obtenerImagenesRama(num));


                $("#Panel_Titulo").empty();
                $("#Panel_Titulo").append("Informacion de la rama: "+rama.nombre);


                $("#Titulo_Comentario").empty();
                $("#Titulo_Comentario").append("Comentarios de la rama:");
                $("#comments-list").empty();

                habilitarComentario();
                if(isEmpty(comentarioRama)){
                    $("#Titulo_Comentario").append($("<h3></h3>").text("Todavia no hay comentarios. Se el primero en comentar!"));
                }
                else{
                    $("#Titulo_Comentario").empty();
                    $("#Titulo_Comentario").append("Comentarios de la rama:");
                }
                //Cargamos comentarios de cada uno de las ramas
                $.each(comentarioRama, function (index, comentario) {
                    mostrarComentarios(comentario);
                });


            }

        });
}

function seleccionarTabGrupo() {
                $("#id_rama").removeClass("active");
                $("#id_grupo").addClass("active");
            }
function seleccionarTabRama() {
                $("#id_grupo").removeClass("active");
                $("#id_rama").addClass("active");
            }

function obtenerLocalizacionGrupos() {
    var retorno = new Array();
     $.each(datos, function (index, grupo) {
        var grupoI = new Array();
        grupoI.push(grupo.nombre);
        grupoI.push(grupo.ubicacion.coords[0]);
        grupoI.push(grupo.ubicacion.coords[1]);
        grupoI.push(grupo._id);
        retorno.push(grupoI);
   });

    return retorno;
}
function obtenerImagenesGrupo(nombre_cod) {
    var retorno = new Array();
   $.each(ramas, function (index, rama) {
        if (nombre_cod == (rama.GrupoPerteneciente)) {
          $.each(rama.fotos, function (index, foto){
                    var ArregloFoto=new Array();
                    ArregloFoto.push(rama.nombre);
                    ArregloFoto.push(foto);
                    retorno.push(ArregloFoto);
                });
            }
        });
    return retorno;
}
function obtenerImagenesRama(num) {
    var retorno = new Array();
   $.each(ramas, function (index, rama) {
       if (num == rama._id) {
          $.each(rama.fotos, function (index, foto){
                    var ArregloFoto=new Array();
                    ArregloFoto.push(rama.nombre);
                    ArregloFoto.push(foto);
                    retorno.push(ArregloFoto);
                });
            }
        });

    return retorno;
}


/* Funciones relacionadas a la carga de comentarios*/


function enviarComentario(){

    $('#panel-nuevoComentario').hide();
    var nick = dataUser.name;
    var Imagen= "https://graph.facebook.com/"+dataUser.id+"/picture?type=normal";
    var comentario = $("#coment").val();
    var f = new Date();
    var Fecha = f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear();
    var Hora = f.getHours() + ":" + f.getMinutes();

    var Nuevo_comentario =   {id: nick, perteneciente: codigo, texto: comentario, fecha: Fecha, horario: Hora, imagen: Imagen};
    //var Json_comment= JSON.parse(jsonString);
    //$.post('./api/comentarios',data=Nuevo_comentario, dataType=json);
  guardar('./api/comentarios', Nuevo_comentario);

    mostrarComentariosAgregado(nick, comentario, Fecha, Hora, Imagen);
}

function guardar(ruta,elemento_nuevo) {
	//const jsonString = JSON.stringify(Array.from(comentario.values()));
	$.ajax({
	    url: ruta,
	    type: 'POST',
	    data: JSON.stringify({elemento: elemento_nuevo}),
    	contentType: "application/json",
    	dataType: "json",
	    success: function(data){},
      error:function(data){ }
	});
}


function mostrarComentariosAgregado(nick, comentario, fecha, hora, imagen ) {

    $("#comments-list").prepend("<li>" +
            "<div class=\"comment-main-level\">" +
            "<div class=\"comment-avatar\"><img src=\""+imagen+"\" alt=\"\"></div>" +
            "<div class=\"comment-box\">" +
            "<div class=\"comment-head\">" +
            "<h6 class=\"comment-name \">" +
            nick
            + "</h6>"
            + "<span>" + fecha + "</span>"
            + "<span>" + hora + "</span>"
            + "<i class=\"fa fa-reply\"></i>"
            + "<i class=\"fa fa-heart\"></i>"
            + "</div>"
            + "<div class=\"comment-content\">"
            + comentario
            + "</div>"
            + "</div>"
            + "</div>"
            + "</li>");


}



function visualizarPanel_NuevoCometario(){
      $("#coment").empty();
      $('#panel-nuevoComentario').show();


}
