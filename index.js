let model, webcam, prediccions, maxPrediccions, geoID;

function inicia_sessio() {
    const username = document.querySelector('#nom_usuari').value;
    const password = document.querySelector('#contrasenya').value;
    // Lógica para el inicio de sesión
    console.log(`Inicio de sesión con usuario: ${username}`);
}

function nou_usuari() {
    // Lógica para crear un nuevo usuario
    console.log('Creación de nuevo usuario');
}

function canvia_seccio(num_boto) {
    const menu = document.getElementById("menu");
    const num_botons = menu.children.length;
    for (let i = 1; i <= num_botons; i++) {
        let boto = document.getElementById("boto_" + i);
        let seccio = document.getElementById("seccio_" + i);
        if (i === num_boto) {
            boto.style.color = "#950E17";
            boto.style.backgroundColor = "#FCDEE0";
            seccio.style.display = "flex";
        } else {
            boto.style.color = "white";
            boto.style.backgroundColor = "#950E17";
            seccio.style.display = "none";
        }
    }

    if (num_boto === 4) {
        mapa.invalidateSize();
        if (typeof geoID === "undefined") {
            navigator.geolocation.watchPosition(geoExit);
        }
    }
}

function tanca_sessio() {
    // Lógica para cerrar sesión
    console.log('Sesión cerrada');
}

function geoExit(posicio) {
    let latitud = posicio.coords.latitude;
    let longitud = posicio.coords.longitude;
    if (typeof geoID === "undefined") {
        geoID = L.marker([latitud, longitud], {zIndexOffset:100, title:"Usuari"}).addTo(mapa);
    } else {
        geoID.setLatLng([latitud, longitud]);
    }
}
