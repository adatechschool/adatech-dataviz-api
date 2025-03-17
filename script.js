// init variables

const hoursDiv = document.querySelector('#hours');
const minutesDiv = document.querySelector('#minutes');
const secondsDiv = document.querySelector('#seconds');

// init functions

function getClock() {
    let intervalId = setInterval(() => {
        let currentTime = new Date();
        let hours = currentTime.getHours();
        let minutes = currentTime.getMinutes();
        let seconds = currentTime.getSeconds();
        
        hours = checkTime(hours);
        minutes = checkTime(minutes);
        seconds = checkTime(seconds);
        hoursDiv.innerText = hours;
        minutesDiv.innerText = minutes;
        secondsDiv.innerText = seconds;
    }, 1000);
}

function checkTime(x) {
    if (x < 10) {
        x = "0" + x;
    }
    return x;
}

// async function getISSPosition() {
//     const response =await fetch(url API);
//     const coordinate = await response.json();
// }


// execute code

getClock();