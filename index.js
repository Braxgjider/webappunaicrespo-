function canvia_seccio(num_boto) {
    const menu = document.getElementById("menu");
    const num_botons = menu.children.length;    // el número de botones dentro del elemento "menu"
    for (let i = 1; i < num_botons; i++) {
        let boto = document.getElementById("boto_" + i);
        let seccio = document.getElementById("seccio_" + i);
        if (i === num_boto) {
            boto.style.color = "#950E17";    // se destaca la sección activa con el cambio de colores del botón correspondiente
            boto.style.backgroundColor = "#FCDEE0";
            seccio.style.display = "flex";    // se hace visible la sección activa
        }
        else {
            boto.style.color = "white";    // colores de los botones de secciones inactivas
            boto.style.backgroundColor = "#950E17";
            seccio.style.display = "none";    // se ocultan las secciones inactivas
        }
    }

    if (num_boto === 4) {
        mapa.invalidateSize();
        if (typeof geoID === "undefined") {    // si aún no se han obtenido los datos de localización del dispositivo
            navigator.geolocation.watchPosition(geoExit);    // inicia el seguimiento de la localización del dispositivo
        }
    }
}

function geoExit(posicio) {
    let latitud = posicio.coords.latitude;
    let longitud = posicio.coords.longitude;
    if (typeof geoID === "undefined") {    
        geoID = L.marker([latitud, longitud], {zIndexOffset:100, title:"Usuari"}).addTo(mapa);    // se define el marcador  geoID y se sitúa por encima de los demás
    } else {    // primeros datos de localización, se crea el marcador de usuario 
        geoID.setLatLng([latitud, longitud]);    // actualización de la posición del marcador de usuario en el mapa
    }
}
