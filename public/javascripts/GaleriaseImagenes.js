
function crearFotos() {
    var imagenes = ["img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg", "img5.jpg", "img6.jpg", "img7.jpg"];
    crearGaleria(imagenes);
}
function crearGaleria(imagenes) {
    $("#GaleriadeFotos").empty()
    var i, cadena = "";
    for (i = 0; i < imagenes.length; i++) {
        if ((i % 4) == 0) {
            cadena = cadena + startRow(i);
        }
        cadena = cadena + insertarImagen(imagenes[i][1],"Foto de "+imagenes[i][0]+" "+i);
        if ((i % 4) == 3 || i == imagenes.length - 1) {
            cadena = cadena + endRow(i);
        }
    }
    $("#GaleriadeFotos").append(cadena);
    $('#media').carousel({
        pause: true,
        interval: false,
    });
}
function startRow(i) {
    if (i == 0)
        return '<div class=\"item active\"><div class=\"row\">';
    else
        return'<div class=\"item\"><div class=\"row\">';
}

function endRow() {
    return '</div></div>';
}

function insertarImagen(imagen,titulo) {
    var ret = "<div class=\"col-md-3\"><a href=\"./images/" + imagen + "\" data-lightbox=\"example-set\" ";
    ret = ret + "data-title=\""+titulo+"\"><img src=\"./images/" + imagen + "\" class=\"img-thumbnail\"></a></div>";
    return ret;
}

