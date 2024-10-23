//creer le tableau de jeu avec les cartes
const cardsArray = [
  {
    name: "bat",
    img: "JS/img/halloween/bat.png",
  },
  {
    name: "blackcat",
    img: "JS/img/halloween/blackcat.png",
  },
  {
    name: "pumpkin-witch",
    img: "JS/img/halloween/pumpkin-witch.png",
  },
  {
    name: "spiderpumpkin-witch",
    img: "JS/img/halloween/spiderpumpkin-witch.png",
  },
];

//attraper un élément pour lui ajouter celui dont on a besoin
const game = document.getElementById("game");
const grid = document.createElement("section");
grid.setAttribute("class", "grid");
game.appendChild(grid);

//grille de jeu cartes x2
const gameGrid = cardsArray.concat(cardsArray);

//rendre aléatoire la grille de jeu
gameGrid.sort(() => 0.5 - Math.random());

let firstTry = "";
let secondTry = "";
let counter = 0;
let delay = 1000; //en ms
let matchedPairs = 0;
let gameOver = false;

//à partir du tableau de jeu créer chaque élément correspondant en HTML
gameGrid.forEach((cardElement) => {
  const card = document.createElement("div");
  //ajouter l'image dans l'element
  card.classList.add("card");
  card.dataset.name = cardElement.name;
  //créer une face avant
  const frontCard = document.createElement("div");
  frontCard.classList.add("frontCard");
  //image ajoutee quand la carte est cliquee
  //  frontCard.style.backgroundImage = `url(${cardElement.img})`;
  //créer une face arrière
  const backCard = document.createElement("div");
  backCard.classList.add("backCard");

  //applique la valeur cardElement à card(chaque carte)
  card.style.backgroundImage = `url(${cardElement.img})`;

  card.appendChild(frontCard); // face avant avec l'image +
  card.appendChild(backCard); //face arrière visible en first +
  grid.appendChild(card); //la carte à la grille
});

//fonction pour checker les élements qui vont de paires via la class selected CSS
const match = () => {
  let selected = document.querySelectorAll(".selected");
  if (
    selected.length === 2 &&
    selected[0].dataset.name === selected[1].dataset.name
  ) {
    selected.forEach((card) => {
      card.classList.add("match");
      card.style.pointerEvents = "none"; // Désactiver les clics sur les cartes paires
    });
    matchedPairs++; // Incrémenter le compteur de paires trouvées

    // Vérifier si toutes les paires sont trouvées
    if (matchedPairs === cardsArray.length) {
      setTimeout(() => {
        //afficher le message de relance
        document.getElementById("playagain").style.display = "block";
        gameOver = true;
      }, 500);
    }
  }
};

const resetGame = () => {
  document.getElementById("playagain").style.display = "none";
  //reset des variables
  matchedPairs = 0;
  firstTry = "";
  secondTry = "";
  counter = 0;
  gameOver = false; //pour recommencer la partie

  //vider la grille de jeu actuelle
  grid.innerHTML = "";

  //refaire l'aléatoire des cartes
  gameGrid.sort(() => 0.5 - Math.random());

  //refaire le jeu : cartes
  gameGrid.forEach((cardElement) => {
    const card = document.createElement("div");
    //ajouter l'image dans l'element
    card.classList.add("card");
    card.dataset.name = cardElement.name;
    //créer une face avant
    const frontCard = document.createElement("div");
    frontCard.classList.add("frontCard");
    //image ajoutee quand la carte est cliquee
    //  frontCard.style.backgroundImage = `url(${cardElement.img})`;
    //créer une face arrière
    const backCard = document.createElement("div");
    backCard.classList.add("backCard");

    //applique la valeur cardElement à card(chaque carte)
    card.style.backgroundImage = `url(${cardElement.img})`;

    card.appendChild(frontCard); // face avant avec l'image +
    card.appendChild(backCard); //face arrière visible en first +
    grid.appendChild(card); //la carte à la grille
  });
};

//ajouter l'evenement 'appuyer sur une touche'
document.addEventListener("keydown", (event) => {
  //check si on appuie sur "espace" + partie terminée
  if (event.code === "Space" && gameOver) {
    resetGame(); //fonction de relance
  }
});

let previousTarget = null;
//fontion pour reset les essais
const resetTry = () => {
  firstTry = "";
  secondTry = "";
  counter = 0;

  const selected = document.querySelectorAll(".selected");
  selected.forEach((card) => {
    card.classList.remove("selected");
  });
};

//ajouter un evenement à chaque clic sur une carte
grid.addEventListener("click", function (event) {
  //cibler l'evenement du clic
  const clicked = event.target.classList.contains("card")
    ? event.target
    : event.target.closest(".card");
  //cible la carte cliquee
  if (
    !clicked ||
    clicked === previousTarget ||
    clicked.classList.contains("selected") ||
    clicked.classList.contains("match")
  ) {
    //sortir si ce n'est pas une carte, ou déjà cliquee
    return;
  }
  if (counter < 2) {
    counter++;
    //pour le 1er clic
    if (counter === 1) {
      firstTry = clicked.dataset.name;
      clicked.classList.add("selected");
    } else {
      //2ème clic
      secondTry = clicked.dataset.name;
      clicked.classList.add("selected");

      //si 2 cartes cliquees, checker la paire
      if (firstTry && secondTry) {
        //si ok
        if (firstTry === secondTry) {
          //un délai avant de valider
          setTimeout(() => {
            match();
            resetTry(); //après le check ok, reset
          }, delay);
        } else {
          setTimeout(resetTry, delay); //laisse un délai avant de reset si NOK
        }
      }
    }
    previousTarget = clicked;
  }
});
