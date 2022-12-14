const square = document.querySelectorAll(".square");

const mole = document.querySelectorAll(".mole");

const time = document.querySelector("#time");

const score = document.querySelector("#score");

let result = 0;
let currentTime = time.textContent;

let hitPosition;

function randomSquare() {
  square.forEach((el) => el.classList.remove("mole"));

  const randomPosition = Math.floor(Math.random() * square.length);

  square[randomPosition].classList.add("mole");

  hitPosition = square[randomPosition].id;
}

square.forEach((el) => {
  el.addEventListener("click", () => {
    if (el.id == hitPosition) {
      result += 1;
      score.textContent = result;
      hitPosition = null;
    }
  });
});

let moleMove;
function moveMole() {
  moleMove = setInterval(randomSquare, 800);
}

function countdown() {
  if (currentTime == 0) {
    clearInterval(timer);
    time.textContent = 0;

    hitPosition = null;

    clearInterval(moleMove);
    clearInterval(timer);

    alert("Your score : " + result);
  } else {
    currentTime--;
    time.textContent = currentTime.toString();
  }
}

let timer = setInterval(countdown, 1000);

moveMole();
