//creer le tableau de jeu avec les cartes
const cardsArray = [
  {
    name: "crocodile",
    img: "JS/img/animaux/5.webp",
  },
  {
    name: "lion",
    img: "JS/img/animaux/9.webp",
  },
  {
    name: "elephant",
    img: "JS/img/animaux/6.webp",
  },
  {
    name: "wolf",
    img: "JS/img/animaux/25.webp",
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
//let delay = 1000; //en ms

//à partir du tableau de jeu créer chaque élément correspondant en HTML
gameGrid.forEach((cardElement) => {
  const card = document.createElement("div");
  //ajouter l'image dans l'element
  card.classList.add("card");
  card.dataset.name = cardElement.name;
  //créer une face avant
  const frontCard = document.createElement("div");
  frontCard.classList.add("frontCard");
  //créer une face arrière
  const backCard = document.createElement("div");
  backCard.classList.add("backCard");
  backCard.style.backgroundImage = `url(${cardElement.img})`;
  //la carte à la grille + carte avec face avant + face arrière
  grid.appendChild(card);
  card.appendChild(frontCard);
  card.appendChild(backCard);
});

//fonction pour checker les élements qui vont de paires via la class selected CSS
const match = () => {
  let selected = document.querySelectorAll(".selected");
  selected.forEach((card) => {
    card.classList.add("match");
  });
};

let previousTarget = null;
//fontion pour reset les try après avoir effectuer les 2 essais
const resetTry = () => {
  firstTry = "";
  secondTry = "";
  counter = 0;

  let selected = document.querySelectorAll(".selected");
  selected.forEach((card) => {
    card.classList.remove("selected");
  });
};

//ajouter un evenement à chaque clic sur une carte
grid.addEventListener("click", function (event) {
  //cibler l'evenement du clic
  const clicked = event.target;
  //seul les cartes sont cliquables dans la grille + 2 par 2 pas plus

  if (
    clicked.nodeName === "SECTION" ||
    clicked === previousTarget ||
    clicked.parentNode.classList.contains("selected") ||
    clicked.parentNode.classList.contains('match')
  ) {
    return;
  }
  if (counter < 2) {
    counter++;
    if (counter === 1) {
      firstTry = clicked.parentNode.dataset.name;
      console.log(firstTry);
      clicked.parentNode.classList.add("selected");
    } else {
      secondTry = clicked.parentNode.dataset.name;
      console.log(secondTry);
      clicked.parentNode.classList.add("selected");
    } //si les deux essais sont nuls
    if (firstTry !== "" && secondTry !== "") {
      //et si c'est ok
      if (firstTry === secondTry) {
        match();
        resetTry();
      } else {
        resetTry();
      }
    }
    previousTarget = clicked;
  }
});
