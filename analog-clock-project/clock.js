const HOURHAND = document.querySelector(".hand.hour");
const MINUTEHAND = document.querySelector(".hand.minute");
const SECONDHAND = document.querySelector(".hand.second");

// Convert Numbers Ratio to Degree
function setRotation(element , rotationRatio){
    element.style.setProperty("--rotation", rotationRatio * 360);
}

function setClock(){
    const DATE = new Date();
     // current second / 60 * 360 deg
    let SECOND = (DATE.getSeconds()/60);
    // (second + minute) / 60 minutes
    let MINUTE = (SECOND + DATE.getMinutes()) / 60;
    // (minute + hour) / 12 hours
    let HOUR = (MINUTE + DATE.getHours()) / 12;
    setRotation(SECONDHAND,SECOND);
    setRotation(MINUTEHAND,MINUTE);
    setRotation(HOURHAND,HOUR);
}
let date = new Date();

setInterval(setClock,1000);

console.log(`Hour : ${date.getHours()} | Minute : ${date.getMinutes()} | Second : ${date.getSeconds()}`);