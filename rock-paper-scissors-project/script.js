const computer = document.querySelectorAll("#computer #pick img");
const player = document.querySelectorAll("#player #pick img");
const text = document.querySelector("#result h1");
const resetButton = document.querySelector("button#reset");
let answer = false;
let random = Math.floor(Math.random()*3);

function result(player , computer){
    if(player == computer){
        text.textContent = 'Draw!';
    } else if ((player == 0 && computer == 1) || (player == 1 && computer == 2) || (player == 3 && computer == 1)){
        text.textContent = 'Computer win!';
    } else if ((player == 0 && computer == 2) || (player == 1 && computer == 0) || (player == 2 && computer == 1)){
        text.textContent = 'Player win!';
    }
}

function reset(){
    answer = false;
    player.forEach(function(e){
        e.removeAttribute("style");
    });
    computer.forEach(function(e){
        e.removeAttribute("style");
    });
    text.textContent = "CHOOSE ONE!"
}

function computerTurn(){
    computer.forEach(function(element,index){
        if(index == random){
            computer[random].style.cssText = 
            "border: 2px solid red; padding: 5px;";
        }
    });
};

resetButton.addEventListener('click',reset);
player.forEach(function(element,index){
    player[index].addEventListener('click',function(){
        if(!answer){
            player[index].style.cssText = "border: 2px solid green; padding: 5px;";
            computerTurn();
            result(index,random);
            answer = true;
        }
    })
});