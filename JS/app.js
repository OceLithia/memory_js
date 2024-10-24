//appeler le jeu
import { initMemoryGame } from "./play.js";
//appeler le formulaire d'inscription
import { initForm } from "./validators.js";

//charger le memory ou le formulaire lorsque le DOM est prêt
document.addEventListener("DOMContentLoaded", () => {
  //recuperer le 'chemin' html
  const path = window.location.pathname;

  //check si on est sur le memory
  if (path.endsWith('play.html')) {
    initMemoryGame();
  }

  //check si on est sur le formulaire d'inscription
  if (path.endsWith("inscription.html")) {
    initForm();
  }
});
