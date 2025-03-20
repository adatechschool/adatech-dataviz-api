
// init variables

const urlAPI = "https://api.wheretheiss.at/v1/satellites/25544";
const markerSvg = "<img src='image/iss.svg'></img>";
const date = document.querySelector("#Date");
const altitude = document.querySelector("#Altitude");
const latitude = document.querySelector("#Latitude");
const longitude = document.querySelector("#Longitude");
const speed = document.querySelector("#Speed");
const visibility = document.querySelector("#Visibility");
const issData = [{
    date: new Date().toLocaleDateString("fr"),
    altitude: 0,
    lat: 0,
    lng: 0,
    size: 60,
    velocity: 0,
    visibility: "",

}];


/*const globe = new Globe(document.querySelector('#globe'))
    .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
    .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
    .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
    .htmlElementsData(issData)
    .htmlElement(d => {
        const el = document.createElement('div');

        el.innerHTML = markerSvg;
        el.style.color = d.color;
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
}*/

async function getISSPosition() {
    try {
        const response = await fetch(urlAPI);
        const data = await response.json();

        issData[0].lat = data.latitude;
        issData[0].lng = data.longitude;
        issData[0].altitude = data.altitude;
        issData[0].velocity = data.velocity;
        issData[0].visibility = data.visibility;
        
        // updateISSPosition();
    }
    catch (error) {
        //affiche le type d'erreur
        console.error(error)
    }
}


// execute code
getISSPosition();
let intervalId = setInterval(() => {
    getISSPosition();
    date.innerText = issData[0].date;
    altitude.innerText = issData[0].altitude;
    latitude.innerText = issData[0].lat;
    longitude.innerText = issData[0].lng;
    speed.innerText = issData[0].velocity;
    visibility.innerText = issData[0].visibility;

}, 3000);