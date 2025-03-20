import {issData} from "globe.js";

const date = document.querySelector("#Date");
const altitude = document.querySelector("#Altitude");
const latitude = document.querySelector("#Latitude");
const longitude = document.querySelector("#Longitude");
const speed = document.querySelector("#Speed");
const visibility = document.querySelector("#Visibility");

date.innerText = issData[0].date;
altitude.innerText = issData[0].altitude;
latitude.innerText = issData[0].lat;
longitude.innerText = issData[0].lng;
speed.innerText = issData[0].velocity;
visibility.innerText = issData[0].visibility;

