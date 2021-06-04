const textArea = document.querySelector("#text-area");
let question = document.querySelector(".type-text").innerHTML;
const buttonReset = document.querySelector(".meta .reset");
const timer = document.querySelector("#clock .timer");

let interval;
let startProgram = false;
let time = [0, 0, 0, 0];

function spellCheck() {
  let answerWord = textArea.value;
  let questionWord = question.substring(0, answerWord.length);
  // Untuk mengecek apakah kata sudah sama?
  if (answerWord === question) {
    textArea.style.cssText = "box-shadow: 0px 0px 16px 2px rgb(255, 200, 100)";
    clearInterval(interval);
  } else {
    // Untuk mengecek setiap huruf yang diketik
    if (answerWord === questionWord) {
      textArea.style.cssText =
        "box-shadow: 0px 0px 16px 2px rgb(154, 255, 129)";
    } else {
      textArea.style.cssText =
        "box-shadow: 0px 0px 16px 2px rgb(255, 165, 165)";
    }
  }
}

// Format penulisan time
function zeroFormat(time) {
  var result = time < 10 ? "0" + time : time;
  return result;
}

// Perhitungan time menit, detik, dan milidetik
function runTime() {
  let currentTime = `${zeroFormat(time[0])}:${zeroFormat(time[1])}:${zeroFormat(
    time[2]
  )}`;
  timer.innerHTML = currentTime;
  time[3]++;
  time[0] = Math.floor(time[3] / 100 / 60);
  time[1] = Math.floor(time[3] / 100 - time[0] * 60);
  time[2] = Math.floor(time[3] - time[1] * 100 - time[0] * 6000);
}

// Program berjalan
function start() {
  let answerLength = textArea.value.length;
  if (answerLength === 0 && !startProgram) {
    startProgram = true;
    interval = setInterval(runTime, 10);
  }
}

// Pertanyaan secara acak
function randomPicker(numbers) {
  let randomQuestion = document.querySelector(".type-text");
  let text;
  switch (numbers) {
    case 1:
      text = "This is the text.";
      randomQuestion.innerHTML = text;
      question = text;
      break;
    case 2:
      text = "How are you?";
      randomQuestion.innerHTML = text;
      question = text;
      break;
    case 3:
      text = "I'm the fastest typer!";
      randomQuestion.innerHTML = text;
      question = text;
      break;
    case 4:
      text = "Are you ready kids!";
      randomQuestion.innerHTML = text;
      question = text;
      break;
    case 5:
      text = "Hey bro, This is a big world!";
      randomQuestion.innerHTML = text;
      question = text;
      break;
  }
}

// Tombol reset
function reset() {
  let random = Math.floor(Math.random() * 5) + 1;
  randomPicker(random);
  textArea.value = "";
  timer.innerHTML = "00:00:00";
  textArea.style.cssText = "box-shadow: 0px 0px 16px 6px rgb(225, 225, 225)";
  clearInterval(interval);
  interval = null;
  time = [0, 0, 0, 0];
  startProgram = false;
}

textArea.addEventListener("keyup", spellCheck, false);
textArea.addEventListener("keypress", start, false);
buttonReset.addEventListener("click", reset, false);
