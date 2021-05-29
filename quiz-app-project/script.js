const quizData = [
  {
    question: "Siapa nama presiden pertama di Indonesia?",
    a: "Moh Hatta",
    b: "Ir Soekarno",
    c: "Jokowi",
    correct: "B",
  },
  {
    question: "Kapan indonesia merdeka?",
    a: "15 Agustus 1945",
    b: "16 Agustus 1945",
    c: "17 Agustus 1945",
    correct: "C",
  },
  {
    question: "Apa ibu kota dari negara Indonesia?",
    a: "DKI Jakarta",
    b: "Bali",
    c: "Bandung",
    correct: "A",
  },
  {
    question: "Berapakah jumlah provinsi di Indonesia?",
    a: "33",
    b: "34",
    c: "35",
    correct: "B",
  },
  {
    question: "Apa pulau terbesar di Indonesia?",
    a: "Papua",
    b: "Kalimantan",
    c: "Jawa",
    correct: "A",
  },
];

const questionEl = document.body.querySelector(".box-answer h2");
const submitEl = document.body.querySelector("button");
const answerEL = document.body.querySelectorAll(".answer-input");

let currentNumber = 0;
let counter = 0;
const loadQuestion = (num) => {
  const aEl = document.body.querySelector(".a-answer");
  const bEl = document.body.querySelector(".b-answer");
  const cEl = document.body.querySelector(".c-answer");
  questionEl.textContent = quizData[num].question;
  aEl.textContent = quizData[num].a;
  bEl.textContent = quizData[num].b;
  cEl.textContent = quizData[num].c;
};

loadQuestion(currentNumber);

const removeChecked = () => {
  answerEL.forEach((e) => {
    e.checked = false;
  });
};

const getAnswer = () => {
  let answer = undefined;
  answerEL.forEach((e) => {
    if (e.checked) {
      answer = e.value;
    }
  });
  return answer;
};

const gameOver = () => {
  alert(`Benar ${counter}/5 (${(counter / 5) * 100})`);
  counter = 0;
  currentNumber = 0;
  loadQuestion(currentNumber);
};

submitEl.addEventListener("click", () => {
  if (getAnswer() === quizData[currentNumber].correct) {
    counter++;
  }
  removeChecked();
  currentNumber++;
  if (currentNumber !== quizData.length) {
    loadQuestion(currentNumber);
  } else {
    gameOver();
  }
});
