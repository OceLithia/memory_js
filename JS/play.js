//créer la fonction du jeu pour l'appeler dans app.js
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

  // Fonction pour créer chaque carte dans la grille
  function createGrid() {
    gameGrid.forEach((cardElement) => {
      const card = document.createElement("div");
      card.classList.add("card");
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

  // Fonction pour vérifier les paires
  function match() {
    let selected = document.querySelectorAll(".selected");
    if (
      selected.length === 2 &&
      selected[0].dataset.name === selected[1].dataset.name
    ) {
      selected.forEach((card) => {
        card.classList.add("match");
        card.style.pointerEvents = "none";
      });
      matchedPairs++;
      if (matchedPairs === cardsArray.length) {
        setTimeout(() => {
          document.getElementById("playagain").style.display = "block";
          document.getElementById("win").style.display = "block";
          gameOver = true;
        }, 500);
      }
    }
  }

  // Fonction pour réinitialiser les essais
  function resetTry() {
    firstTry = "";
    secondTry = "";
    counter = 0;
    const selected = document.querySelectorAll(".selected");
    selected.forEach((card) => {
      card.classList.remove("selected");
    });
  }

  // Fonction pour réinitialiser le jeu
  function resetGame() {
    document.getElementById("playagain").style.display = "none";
    document.getElementById("win").style.display = "none";
    matchedPairs = 0;
    firstTry = "";
    secondTry = "";
    counter = 0;
    gameOver = false;
    grid.innerHTML = ""; // Vider la grille
    gameGrid.sort(() => 0.5 - Math.random()); // Mélanger les cartes
    createGrid(); // Recréer la grille
  }

  // Ajouter l'événement pour cliquer sur une carte
  grid.addEventListener("click", function (event) {
    const clicked = event.target.classList.contains("card")
      ? event.target
      : event.target.closest(".card");

    if (
      !clicked ||
      clicked === previousTarget ||
      clicked.classList.contains("selected") ||
      clicked.classList.contains("match")
    ) {
      return;
    }

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
      previousTarget = clicked;
    }
  });

  // Ajouter l'événement pour réinitialiser le jeu avec la touche espace
  document.addEventListener("keydown", (event) => {
    if (event.code === "Space" && gameOver) {
      resetGame();
    }
  });

  // Initialiser la grille au démarrage
  createGrid();
}

export { initMemoryGame };
