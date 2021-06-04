const circle = document.querySelector(".circle");
const body = document.body;
let windowsheight = window.innerHeight;
let windowswidth = window.innerWidth;

function mouseCoordinate(event){
    let horizontal = windowswidth - event.clientX;
    let vertical = windowsheight - event.clientY;
    circle.style.left = horizontal + "px";
    circle.style.top = vertical + "px";
};

function changeColor(){
    circle.style.backgroundColor = "turquoise";
}

function changeShape(){
    circle.classList.toggle("change");
}

circle.addEventListener("mouseover", changeColor , false);
circle.addEventListener("click",changeShape,false);
circle.addEventListener("mouseleave", function(){circle.removeAttribute("style")} , false);
body.addEventListener("mousemove" ,mouseCoordinate ,false );
