// Variables necessàries per a la programació
let model, webcam, prediccions, maxPrediccions;

// Funció per canviar de secció en fer clic en un botó del menú
function canvia_seccio(num_boto) {
    const menu = document.getElementById("menu");
    const num_botons = menu.children.length;    // el nombre de botons dins de l'element "menu"
    for (let i = 1; i < num_botons; i++) {
        let boto = document.getElementById("boto_" + i);
        let seccio = document.getElementById("seccio_" + i);
        if (i === num_boto) {
            boto.style.color = "#950E17";    // es destaca la secció activa amb el canvi de colors del botó corresponent
            boto.style.backgroundColor = "#FCDEE0";
            seccio.style.display = "flex";    // es fa visible la secció activa
        } else {
            boto.style.color = "white";    // colors dels botons de seccions inactives
            boto.style.backgroundColor = "#950E17";
            seccio.style.display = "none";    // es  oculten les seccions inactives
        }
    }

    // Si es fa clic al botó de la secció 4
    if (num_boto === 4) {
        mapa.invalidateSize();
        if (typeof geoID === "undefined") {    // si encara no s'han obtingut les dades de localització del dispositiu
            navigator.geolocation.watchPosition(geoExit);    // s'inicia el seguiment de la localització del dispositiu
        }
    }

    // Si es fa clic al botó de la secció 5
    if (num_boto === 5) {
        inicia_video();
    }
}

// Funció per iniciar la webcam i el model d'IA
async function inicia_video() {
    const codi_model = "aquí_va_el_código_del_modelo";    // Substitueix "aquí_va_el_código_del_modelo" pel codi del model d'IA que has creat anteriorment
    const tmURL = "https://teachablemachine.withgoogle.com/models/" + codi_model;
    const modelURL = tmURL + "/model.json";
    const metadataURL = tmURL + "/metadata.json";
    model = await tmImage.load(modelURL, metadataURL);
    maxPrediccions = model.getTotalClasses();    // nombre de tipus d'imatges per reconèixer
    webcam = new tmImage.Webcam(300, 300, true);    // posada en marxa de la webcam
    await webcam.setup();
    await webcam.play();
    window.requestAnimationFrame(loop);    // bucle
    document.getElementById("icona_video").style.display = "none";    // oculta la icona de la càmera de vídeo
    document.getElementById("coincidencia").style.display = "flex";    // mostra el text amb la predicció de coincidències
    document.getElementById("webcam-container").appendChild(webcam.canvas);
    prediccions = document.getElementById("prediccions");
    for (let i = 0; i < maxPrediccions; i++) {
        prediccions.appendChild(document.createElement("div"));    // es crea un contenidor per a la coincidència de cada tipus d'imatge
    }
}

// Bucle que es repeteix indefinidament, capturant una imatge de la càmera i fent la predicció de coincidències
async function loop() {
    webcam.update();
    await predice();
    window.requestAnimationFrame(loop);
}

// Predicció de coincidències d'acord amb el model
async function predice() {
    const prediccion = await model.predict(webcam.canvas);
    for (let i = 0; i < maxPrediccions; i++) {
        const clase = prediccion[i].className + ": " + prediccion[i].probability.toFixed(2);    // es conserven dues xifres decimals
        predicciones.childNodes[i].innerHTML = clase;
    }
}

// Funció que s'executa quan s'obtenen les dades de geolocalització del dispositiu
function geoExit(posicio) {
    let latitud = posicio.coords.latitude;
    let longitud = posicio.coords.longitude;
    if (typeof geoID === "undefined") {    
        geoID = L.marker([latitud, longitud], {zIndexOffset:100, title:"Usuari"}).addTo(mapa);    // es defineix el marcador  geoID i es situa per sobre dels altres
    } else {    // primeres dades de localització, es crea el marcador d'usuari 
        geoID.setLatLng([latitud, longitud]);    // actualització de la posició del marcador d'usuari en el mapa
    }
}
