document.addEventListener("DOMContentLoaded", () => {
  const cardArray = [
    {
      name: "avocado",
      img: "img/avocado.jpg",
    },
    {
      name: "delima",
      img: "img/delima.jpg",
    },
    {
      name: "banana",
      img: "img/banana.jpg",
    },
    {
      name: "avocado",
      img: "img/avocado.jpg",
    },
    {
      name: "banana",
      img: "img/banana.jpg",
    },
    {
      name: "watermelon",
      img: "img/watermelon.jpg",
    },
    {
      name: "papaya",
      img: "img/papaya.jpg",
    },
    {
      name: "peach",
      img: "img/peach.jpg",
    },
    {
      name: "delima",
      img: "img/delima.jpg",
    },
    {
      name: "papaya",
      img: "img/papaya.jpg",
    },
    {
      name: "peach",
      img: "img/peach.jpg",
    },
    {
      name: "watermelon",
      img: "img/watermelon.jpg",
    },
  ];

  cardArray.sort(() => 0.5 - Math.random());

  const grid = document.querySelector(".grid");
  const result = document.querySelector("#result");

  function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
      let card = document.createElement("img");
      card.setAttribute("src", "img/blank.png");
      card.setAttribute("data-id", i);
      card.addEventListener("click", flipCard);
      grid.appendChild(card);
    }
  }

  let cardChoosen = [];
  let cardChoosenId = [];
  let cardsWon = [];

  function showOverflow(display) {
    const overflow = document.createElement("div");
    overflow.setAttribute("id", "overflow");
    overflow.style.cssText = `position:absolute; top:0; left:0; background-color:transparant; width:100%; height:100vh; z-index:999`;
    if (display) {
      document.body.appendChild(overflow);
    } else {
      document.querySelector("#overflow").remove();
    }
  }

  function checkForMatch() {
    const cards = document.querySelectorAll("img");

    const optionOneId = cardChoosenId[0];
    const optionSecondId = cardChoosenId[1];

    if (
      cards[optionOneId].getAttribute("src") ==
      cards[optionSecondId].getAttribute("src")
    ) {
      cards[optionOneId].setAttribute("src", "img/white.png");
      cards[optionSecondId].setAttribute("src", "img/white.png");
      cardsWon.push(cardChoosen);
    } else {
      cards[optionOneId].setAttribute("src", "img/blank.png");
      cards[optionSecondId].setAttribute("src", "img/blank.png");
    }

    cardChoosen = [];
    cardChoosenId = [];

    result.textContent = cardsWon.length;

    if (cardsWon.length == cardArray.length / 2) {
      result.textContent = "Finish!";
    }

    showOverflow(false);
  }

  function flipCard() {
    let cardId = this.getAttribute("data-id");
    let isDelete = false;

    console.log(cardArray[cardId].name);

    cardsWon.forEach((card) => {
      if (card[0] == cardArray[cardId].name) {
        isDelete = true;
      }
    });

    if (!isDelete) {
      cardChoosen.push(cardArray[cardId].name);
      cardChoosenId.push(cardId);
      this.setAttribute("src", cardArray[cardId].img);

      if (cardChoosen.length == 2) {
        showOverflow(true);
        setTimeout(checkForMatch, 500);
      }
    }
  }

  createBoard();
});
