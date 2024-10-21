

//création du memory (tableau avec les cartes)
const cardsArray = [
  {
    name: "gorille",
    img: "./img/animaux/1.webp",
  },
  {
    name: "zebu",
    img: "./img/animaux/2.webp",
  },

  {
    name: "phacochere",
    img: "./img/animaux/3.webp",
  },
  {
    name: "chimpanze",
    img: "./img/animaux/4.webp",
  },
];

const game = document.getElementById('game');
const grid = document.createElement.apply('section');
grid.setAttribute('class', 'grid')

game.appendChild(grid)

cardsArray.forEach((item)=>{
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.name = item.name;
    card.style.backgroundImage = 'url(${item.img})'
    grid.appendChild(card)
})
