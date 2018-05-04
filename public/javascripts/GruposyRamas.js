var datos;
var ramas;
var codigo;
var enGrupo;

$(function () {
    $.get("./api/grupos", function (data) {
       datos = data;
      $('#panelInfo').hide();
       $('#panel-nuevoComentario').hide();
       initMap();
    });
    $.get("./data/ramas.json", function (data) {
      ramas =data.ramas;
    });
});

function mostrarGrupo(data) {
    $("#gruposyRamas").empty();

    $.each(data, function (index, grupo) {
        agregarGrupo(grupo);
    });
   $('#panelInfo').hide();

}

function mostrarGrupo2() {
    seleccionarTabGrupo();
    mostrarGrupo(datos);
}

function agregarGrupo(grupo) {
    var nombre = $("<button type=\"button\" class=\"list-group-item\" onclick=\"mostrarRama(" + grupo.codigo + ")\"></button>").text(grupo.nombre);
    $("#gruposyRamas").append(nombre);

}


function mostrarRama(nombre_cod) {
    mostrarInfoGrupo(nombre_cod);
    seleccionarTabRama();
    var raw;
    $("#gruposyRamas").empty();
    $.each(ramas, function (index, rama) {
        if (nombre_cod == (rama.GrupoPerteneciente)) {
            raw = $("<button type=\"button\" class=\"list-group-item\" onclick=\"mostrarInfoRama(" + rama.numeracion + ")\"></button>").text(rama.nombre);
             $("#gruposyRamas").append(raw);
            }

    });
}

function mostrarInfoGrupo(nombre_cod) {
     codigo = nombre_cod;
    enGrupo = true;
    $('#panelInfo').show();
    $.each(datos, function (index, grupo) {
        if (nombre_cod == (grupo.codigo)) {
            $("#boddy2").empty();
            $("#boddy2").append("<dt>Nombre grupo:</dt>");
            $("#boddy2").append($("<dd></dd>").text(grupo.nombre));

            $("#boddy2").append("<dt>Código:</dt>");
            $("#boddy2").append($("<dd></dd>").text(grupo.codigo));

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

            centrarMapa(grupo.ubicacion.latitud,grupo.ubicacion.longitud);
            crearGaleria(obtenerImagenesGrupo(nombre_cod));

             $("#Panel_Titulo").empty();
             $("#Panel_Titulo").append("Informacion del grupo: "+grupo.nombre);


            $("#Titulo_Comentario").empty();
            $("#Titulo_Comentario").append("Comentarios del grupo:");

            $("#comments-list").empty();


/*

             if(grupo.comentarios.length==0){
                    $("#Titulo_Comentario").append($("<h3></h3>").text("Todavia no hay comentarios. Se el primero en comentar!"));
                }
            //Cargamos comentarios de cada uno de los grupos
            $.each(grupo.comentarios, function (index, comentario) {
                mostrarComentarios(comentario);

            });
            mostrar_comentarios_Locales();
*/
        }
    });

}

function mostrarComentarios(comentario) {
    $("#comments-list").append("<li>" +
            "<div class=\"comment-main-level\">" +
            "<div class=\"comment-avatar\"><img src=\"images/avatar.png\" alt=\"\"></div>" +
            "<div class=\"comment-box\">" +
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
           if (num == rama.numeracion) {
                $("#boddy2").empty();
                $("#boddy2").append("<dt>Nombre rama:</dt>");
                $("#boddy2").append($("<dd></dd>").text(rama.nombre));
                $("#boddy2").append("<dt>Edad minima:</dt>");
                $("#boddy2").append($("<dd></dd>").text(rama.edad_minima));
                $("#boddy2").append("<dt>Edad maxima:</dt>");
                $("#boddy2").append($("<dd></dd>").text(rama.edad_maxima));
                $("#boddy2").append("<dt>Fecha inicio inscripcion:</dt>");
                $("#boddy2").append($("<dd></dd>").text(rama.fechaInscripcion_inicio));
                $("#boddy2").append("<dt>Fecha cierre inscripcion:</dt>");
                $("#boddy2").append($("<dd></dd>").text(rama.fechaIscripcion_fin));
                $("#boddy2").append("<dt>Tipo:</dt>");
                $("#boddy2").append($("<dd></dd>").text(rama.tipo));
                crearGaleria(obtenerImagenesRama(num));


                $("#Panel_Titulo").empty();
                $("#Panel_Titulo").append("Informacion de la rama: "+rama.nombre);


                $("#Titulo_Comentario").empty();
                $("#Titulo_Comentario").append("Comentarios de la rama:");
                $("#comments-list").empty();

                if(rama.comentarios.length==0){
                    $("#Titulo_Comentario").append($("<h3></h3>").text("Todavia no hay comentarios. Se el primero en comentar!"));
                }
                //Cargamos comentarios de cada uno de las ramas
                $.each(rama.comentarios, function (index, comentario) {
                    mostrarComentarios(comentario);
                });
                mostrar_comentarios_Locales();
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
        grupoI.push(grupo.ubicacion.latitud);
        grupoI.push(grupo.ubicacion.longitud);
        grupoI.push(grupo.codigo);
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
       if (num == rama.numeracion) {
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
    var nick = $("#Nombre").val();
    var comentario = $("#coment").val();

    var f = new Date();
    var fecha = f.getDate() + "/" + (f.getMonth() + 1) + "/" + f.getFullYear();
    var hora = f.getHours() + ":" + f.getMinutes();
    guardarComentario(nick, comentario, fecha, hora);
    mostrarComentariosAgregado(nick, comentario, fecha, hora);
}


function mostrarComentariosAgregado(nick, comentario, fecha, hora) {

    $("#comments-list").prepend("<li>" +
            "<div class=\"comment-main-level\">" +
            "<div class=\"comment-avatar\"><img src=\"images/avatar.png\" alt=\"\"></div>" +
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

function inicializarAlmacenamiento_local() {

    var g = localStorage.getItem('grupos');
    if (g == null) {
        var arreglo1 = {
            'screens': [],
            'state': true
        };
        localStorage.setItem('grupos', JSON.stringify(arreglo1));
    }

    g = localStorage.getItem('ramas');
    if (g == null) {

        var arreglo2 = {
            'screens': [],
            'state': true
        };
        localStorage.setItem('ramas', JSON.stringify(arreglo2));
    }


}

function guardarComentario(nick, comentario, fecha, hora) {
    var item_Name;
    if (enGrupo)
        item_Name = 'grupos';
    else
        item_Name = 'ramas';
    var nuevosComentarios = JSON.parse(localStorage.getItem(item_Name));
    ;
    if (nuevosComentarios != null) {
        nuevosComentarios.screens.push({'nombre': nick, 'codigo': codigo, 'comentario': comentario, 'fecha': fecha, 'hora': hora});
        localStorage.setItem(item_Name, JSON.stringify(nuevosComentarios));

    }
}

function mostrar_comentarios_Locales() {
    var item;
    if (enGrupo)
        item = 'grupos';
    else
        item = 'ramas';
    var g = localStorage.getItem(item);
    if (g != null) {
        var restoredSession = JSON.parse(g);
        $.each(restoredSession.screens, function (index, comentarios) {
            if (codigo == comentarios.codigo) {
                mostrarComentariosAgregado(comentarios.nombre, comentarios.comentario, comentarios.fecha, comentarios.hora);
            }
        });
    }
}


function visualizarPanel_NuevoCometario(){
      $('#panel-nuevoComentario').show();
}
