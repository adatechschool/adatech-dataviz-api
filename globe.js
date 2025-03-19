// init variables

const urlAPI = "https://api.wheretheiss.at/v1/satellites/25544";
let latitude;
let longitude;

const world = new Globe(document.querySelector('#globe'))
.globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
.bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
.backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')

// Add auto-rotation
world.controls().autoRotate = true;
world.controls().autoRotateSpeed = 0.6;

// init functions

async function getISSPosition() {
    try {
        const response = await fetch(urlAPI);
        const data = await response.json();
        latitude = data.latitude;
        longitude = data.longitude;
    }
    catch (error) {
        //affiche le type d'erreur
        console.error(error)
    }
}

function sendISSposition() {
    getISSPosition();
    //transmet la latitude à l'objet world
    world.htmlLat(latitude);
    world.htmlLng(longitude);

    let intervalId = setInterval(() => {
        getISSPosition();
        world.htmlLat(latitude);
        world.htmlLng(longitude);
    }, 30000);
}


// execute code

sendISSposition();