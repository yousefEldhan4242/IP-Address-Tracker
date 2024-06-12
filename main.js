const apiKey = "at_NnNpmi3dI4nIKDt1psEmsYiDx8e4P";
let input = document.querySelector('.my-input');
let btn = document.querySelector('.my-btn');
let ipAddress = document.querySelector(".ip-block h2");
let Userlocation = document.querySelector(".location-block h2");
let timeZone = document.querySelector(".timezone-block h2");
let isp = document.querySelector(".isp-block h2");
let warnMessage = document.querySelector(".warn")

const ipv4Regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
const ipv6Regex = /^(([0-9a-fA-F]{1,4}:){7}([0-9a-fA-F]{1,4}|:)|(([0-9a-fA-F]{1,4}:){1,7}:)|(([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4})|(([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2})|(([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3})|(([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4})|(([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5})|([0-9a-fA-F]{1,4}:)((:[0-9a-fA-F]{1,4}){1,6})|(:((:[0-9a-fA-F]{1,4}){1,7}|:))|(fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9A-Za-z]{1,})|(::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4][0-9]|1{0,1}[0-9]|[1-9]?[0-9]))\.){3}(25[0-5]|(2[0-4][0-9]|1{0,1}[0-9]|[1-9]?[0-9])))|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4][0-9]|1{0,1}[0-9]|[1-9]?[0-9]))\.){3}(25[0-5]|(2[0-4][0-9]|1{0,1}[0-9]|[1-9]?[0-9])))$/;


input.addEventListener('input', ()=>{
    let myInput = Array.from(input.value);
    myInput = myInput.filter((character) => {
        return !isNaN(parseFloat(character)) || character === "." ;
    });
    input.value = myInput.join("");
});


btn.addEventListener('click', () => {
    warnMessage.textContent = "";
    if (check()){
        let userIp = input.value;
        fetch(`https://geo.ipify.org/api/v2/country?apiKey=${apiKey}&ipAddress=${userIp}`).then(response => response.json()).then(data => {
        fetchData(data)
        });
    }else{
        input.value = "";
        input.placeholder = "Please Write a Valid IP Address";
        warnMessage.textContent = "Please Write a Valid IP Address";
    }
});

fetch("https://api.ipify.org?format=json").then((response) => response.json()).then((data) =>{
    fetchData(data);
    
})

var map = L.map('map').setView([51.501904, 0.196037], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var marker = L.marker([51.5, -0.09]).addTo(map);


var circle = L.circle([51.508, -0.11], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(map);


var polygon = L.polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047]
]).addTo(map);

marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
circle.bindPopup("I am a circle.");
polygon.bindPopup("I am a polygon.");


    var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);




function check(){
    if (ipv4Regex.test(input.value) || ipv6Regex.test(input.value)){
        return true;
    }else{
        return false;
    }

}


function fetchData(mydata){
    fetch(`https://geo.ipify.org/api/v2/country?apiKey=${apiKey}&ipAddress=${mydata.ip}`).then((myResponse) => myResponse.json()).then(mydata =>{
        ipAddress.innerHTML = mydata.ip;
        Userlocation.innerHTML = `${mydata.location.region}, ${mydata.location.country} ${mydata.as.asn}`;
        timeZone.innerHTML = "UTC"+mydata.location.timezone;
        isp.innerHTML = mydata.isp;
    })
}