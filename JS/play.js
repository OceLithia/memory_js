function initMemoryGame() {
  const cardsArray = [
    { name: "bat", img: "JS/img/halloween/bat.png" },
    { name: "blackcat", img: "JS/img/halloween/blackcat.png" },
    { name: "pumpkin-witch", img: "JS/img/halloween/pumpkin-witch.png" },
    {
      name: "spiderpumpkin-witch",
      img: "JS/img/halloween/spiderpumpkin-witch.png",
    },
  ];

  //creer la zone de jeu
  const game = document.getElementById("game");
  const grid = document.createElement("section");
  grid.setAttribute("class", "grid");
  game.appendChild(grid);

  const gameGrid = cardsArray.concat(cardsArray);

  gameGrid.sort(() => 0.5 - Math.random());

  let firstTry = "";
  let secondTry = "";
  let counter = 0;
  let delay = 1000;
  let matchedPairs = 0;
  let gameOver = false;
  let previousTarget = null;

  //créer chaque carte dans la grille
  function createGrid() {
    gameGrid.forEach((cardElement) => {
      const card = document.createElement("div");
      card.classList.add("card");
      //donner une valeur a chaque carte
      card.dataset.name = cardElement.name;

      const frontCard = document.createElement("div");
      frontCard.classList.add("frontCard");

      const backCard = document.createElement("div");
      backCard.classList.add("backCard");
      card.style.backgroundImage = `url(${cardElement.img})`;

      card.appendChild(frontCard);
      card.appendChild(backCard);
      grid.appendChild(card);
    });
  }

  function match() {
    let selected = document.querySelectorAll(".selected");
    if (
      //si deux cartes .selected
      selected.length === 2 &&
      //&& valeur identique via dataset.name
      selected[0].dataset.name === selected[1].dataset.name
    ) {
      selected.forEach((card) => {
        card.classList.add("match");

        card.style.pointerEvents = "none";
      });

      matchedPairs++;
      //si nb === nb de cartes alors fin du jeu
      if (matchedPairs === cardsArray.length) {
        setTimeout(() => {
          document.getElementById("playagain").style.display = "block";
          document.getElementById("win").style.display = "block";
          gameOver = true;
        }, 1000);
      }
    }
  }

  //reset les essais
  function resetTry() {
    firstTry = "";
    secondTry = "";
    counter = 0;
    const selected = document.querySelectorAll(".selected");
    selected.forEach((card) => {
      card.classList.remove("selected");
    });
  }

  // reset le jeu
  function resetGame() {
    document.getElementById("playagain").style.display = "none";
    document.getElementById("win").style.display = "none";
    matchedPairs = 0;
    firstTry = "";
    secondTry = "";
    counter = 0;
    gameOver = false;
    grid.innerHTML = "";
    gameGrid.sort(() => 0.5 - Math.random());
    createGrid();
  }

  //cibler l'evenement du clic dans la grille
  grid.addEventListener("click", function (event) {
    const clicked = event.target.classList.contains("card")
      ? event.target
      : event.target.closest(".card");

    //conditions qui finissent l'evenement
    if (
      !clicked ||
      clicked === previousTarget ||
      clicked.classList.contains("selected") ||
      clicked.classList.contains("match")
    ) {
      return;
    }

    // gestion des tentatives
    if (counter < 2) {
      counter++;
      if (counter === 1) {
        firstTry = clicked.dataset.name;
        clicked.classList.add("selected");
      } else {
        secondTry = clicked.dataset.name;
        clicked.classList.add("selected");

        if (firstTry && secondTry) {
          if (firstTry === secondTry) {
            setTimeout(() => {
              match();
              resetTry();
            }, delay);
          } else {
            setTimeout(resetTry, delay);
          }
        }
      }
      //evite de cliquer 2 fois la meme carte
      previousTarget = clicked;
    }
  });

  //reset le jeu avec event "espace"
  document.addEventListener("keydown", (event) => {
    if (event.code === "Space" && gameOver) {
      resetGame();
    }
  });

  createGrid();
}

export { initMemoryGame };
