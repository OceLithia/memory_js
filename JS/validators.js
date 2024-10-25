// checker l'username (minimum 3 caractères)
export function usernameValidator(username) {
  const usernameRegex = /^[a-zA-Z0-9]{3,}$/;
  return usernameRegex.test(username);
}

// checker l'email
export function emailValidator(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

// checker mdp
export function passwordValidator(password) {
  const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/;
  return passwordRegex.test(password);
}

// checker un champ et afficher les erreurs
function validateField(input) {
  const inputValue = input.value;
  const $errorElement = document.getElementById(`${input.id}-error`);

  let isValid = true;
  let errorMessage = "";

  switch (input.id) {
    case "username":
      if (!usernameValidator(inputValue)) {
        errorMessage =
          "Err'hor ! Nom d'utilisateur incorrect (minimum 3 caractères).";
        isValid = false;
      }
      break;
    case "email":
      if (!emailValidator(inputValue)) {
        errorMessage = "Err'hor ! Email incorrect.";
        isValid = false;
      }
      break;
    case "password":
      if (!passwordValidator(inputValue)) {
        errorMessage =
          "Err'hor ! Mot de passe incorrect (min. 6 caractères, 1 chiffre et 1 symbole).";
        isValid = false;
      }
      break;
    case "confirm-password":
      const password = document.getElementById("password").value;
      if (inputValue !== password) {
        errorMessage = "Err'hor ! Les mots de passe ne correspondent pas.";
        isValid = false;
      }
      break;
  }

  if (!isValid) {
    $errorElement.textContent = errorMessage;
    $errorElement.classList.remove("hidden");
  } else {
    $errorElement.textContent = "";
    $errorElement.classList.add("hidden");
  }

  return isValid;
}

// initialisation du formulaire avec validation champ par champ
export function initForm() {
  const $signupForm = document.getElementById("signup-form");

  // `blur` à chaque champ pour la validation en tps reel
  const $inputs = $signupForm.querySelectorAll("input");
  for (const input of $inputs) {
    input.addEventListener("blur", function () {
      validateField(input);
    });
  }

  // check complet du formulaire quand on utilise "valider"
  $signupForm.addEventListener("submit", function (event) {
    event.preventDefault(); 

    let formIsValid = true;
    for (const input of $inputs) {
      const isValid = validateField(input);
      if (!isValid) {
        formIsValid = false;
      }
    }

    if (formIsValid) {
      const user = {
        username: document.getElementById("username").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
      };

      localStorage.setItem("userData", JSON.stringify(user));

      alert("Inscription validée!");
      console.log("Inscriptions : ");
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        console.log(`Clé:${key}, Valeur: ${value}`);
      }

      //reset formulaire
      $signupForm.reset();
    }
  });
}

document.addEventListener("DOMContentLoaded", initForm);
