
// init variables

const urlAPIIss = "https://api.wheretheiss.at/v1/satellites/25544";
const urlAPINominatim = "https://nominatim.openstreetmap.org"
const markerSvg = "<img src='image/iss.svg'></img>";
const date = document.querySelector("#Date");
const altitude = document.querySelector("#Altitude");
const latitude = document.querySelector("#Latitude");
const longitude = document.querySelector("#Longitude");
const country = document.querySelector("#Country");
const speed = document.querySelector("#Speed");
const visibility = document.querySelector("#Visibility");
const issData = [{
    date: new Date().toLocaleDateString("fr"),
    altitude: "Chargement...",
    lat: "Chargement...",
    lng: "Chargement...",
    country: "Chargement...",
    size: 60,
    velocity: "Chargement...",
    visibility: "Chargement...",

}];

const globe = new Globe(document.querySelector('#globe'))
    .globeImageUrl('https://clouds.matteason.co.uk/images/8192x4096/earth.jpg')
    .bumpImageUrl('https://cdn.jsdelivr.net/npm/three-globe/example/img/earth-topology.png')
    .backgroundImageUrl('https://cdn.jsdelivr.net/npm/three-globe/example/img/night-sky.png')
    .htmlElementsData(issData)
    .htmlElement(d => {
        const el = document.createElement('div');

        el.innerHTML = markerSvg;
        el.style.width = `${d.size}px`;
        el.style.transition = 'opacity 250ms';

        el.style['pointer-events'] = 'auto';
        el.style.cursor = 'pointer';
        el.onclick = () => console.info(d);
        return el;
    })

// Add auto-rotation
globe.controls().autoRotate = true;
globe.controls().autoRotateSpeed = 0.3;

// init functions

function updateISSPosition() {
    globe.htmlLat(issData.lat);
    globe.htmlLng(issData.lng);
}

async function getISSPosition() {
    try {
        const response = await fetch(urlAPIIss);
        const data = await response.json();

        issData[0].lat = data.latitude.toFixed(3);
        issData[0].lng = data.longitude.toFixed(3);
        issData[0].altitude = data.altitude.toFixed(0);
        issData[0].velocity = data.velocity.toFixed(0);
        issData[0].visibility = data.visibility;
        updateISSPosition();
        getCountryName();
    }
    catch (error) {
        //affiche le type d'erreur
        console.error(error)
    }
}

async function getCountryName() {
    try {
        const response = await fetch(`${urlAPINominatim}/reverse?format=json&lat=${issData[0].lat}&lon=${issData[0].lng}`);
        const data = await response.json();
        // if (country === "Unable to geocode") {
        //     return "Unable to geocode";
        // }
        issData[0].country = data.address.country;
    }
    catch (error) {
        console.error(error);
    }
}

function dayOrNight(visibility) {
    if (visibility === "daylight") {
        return "Jour";
    }
    return "Nuit";
}

function showDataUI() {
    date.innerText = issData[0].date;
    altitude.innerText = `${issData[0].altitude} km`;
    latitude.innerText = issData[0].lat;
    longitude.innerText = issData[0].lng;
    country.innerText = issData[0].country;
    speed.innerText = `${issData[0].velocity} km/h`;
    visibility.innerText = dayOrNight(issData[0].visibility);
}

function initiate() {
    getISSPosition();
    date.innerText = issData[0].date;
    altitude.innerText = issData[0].altitude;
    latitude.innerText = issData[0].lat;
    longitude.innerText = issData[0].lng;
    speed.innerText = issData[0].velocity;
    visibility.innerText = "Chargement...";
}

// execute code

initiate();
let intervalId = setInterval(() => {
    getISSPosition();
    showDataUI();
}, 3000);


