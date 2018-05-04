var directionsDisplay = new google.maps.DirectionsRenderer;
var directionsService = new google.maps.DirectionsService;


var map, lugares, posicionActual, posicionDestino;
var setMarkers;
function initMap() {
    obtenerLugares();
    crearMapa();
    cargarPosicionActual();
    cargarLugares();
    // armarRuta();
}
function obtenerLugares() {
    lugares = obtenerLocalizacionGrupos();

}
function crearMapa() {
    posicionActual = new google.maps.LatLng(lugares[0][1], lugares[0][2])
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: posicionActual
    });
    //directionsDisplay.setMap(map);
    //directionsDisplay.setPanel(document.getElementById('right-panel'));
    
}
function centrarMapa(lat,long){
    pos= new google.maps.LatLng(lat, long);
    map.setCenter(pos);
}
function cargarPosicionActual() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            posicionActual = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            agregarLugarAlMapa(posicionActual, "Usted esta aquí", 0, "", "lue");
            map.setCenter(posicionActual);
        }, function () {});
    }
}
function cargarLugares() {
    for (i = 0; i < lugares.length; i++) {
        var posicion = new google.maps.LatLng(lugares[i][1], lugares[i][2]);
        agregarLugarAlMapa(posicion, lugares[i][0], lugares[i][3], "" + i);
    }
}
function agregarLugarAlMapa(posicion, titulo, codigo, etiqueta, color = "") {
    var icono = armarIcono(color);
    marker = new google.maps.Marker({
        position: posicion,
        map: map,
        title: titulo,
        label: etiqueta
    });
    marker.setMap(map);
    marker.setIcon("https://mt.google.com/vt/icon?name=icons/spotlight/spotlight-waypoint-b" + color + ".png");
    marker.addListener('click', function () {
        mostrarInfoGrupo(codigo);
    });

}
function armarIcono(color) {
    return "http://maps.google.com/mapfiles/ms/icons/" + color + "-dot.png";
}
function armarRuta() {
    var request = {
        origin: new google.maps.LatLng(lugares[0][1], lugares[0][2]), //posicionActual,
        destination: new google.maps.LatLng(lugares[1][1], lugares[1][2]), // posicionFinal,
        travelMode: 'WALKING'
    };
    directionsService.route(request, function (result, status) {
        if (status == 'OK') {
            directionsDisplay.setDirections(result);
        } else {
            window.alert('Directions request failed due to ' + status);
        }

    });
}





