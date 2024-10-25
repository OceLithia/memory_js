import { initMemoryGame } from "./play.js";
import { initForm } from "./validators.js";

//charge la page à partir de l'HTML via le DOM
document.addEventListener("DOMContentLoaded", () => {
  //recuperer le 'chemin' html
  const path = window.location.pathname;

  //check si on est sur le memory
  if (path.endsWith("play.html")) {
    initMemoryGame();
  }

  //check si on est sur le formulaire d'inscription
  if (path.endsWith("inscription.html")) {
    initForm();
  }
});
