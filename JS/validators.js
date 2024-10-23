//fonction pour valider l'username
function usernameValidator(username) {
  //regex pour un username de minimum 3 caractères
  const usernameRegex = /^[a-zA-Z0-9]{3,}$/;

  //check si le username est ok avec la regex

  return usernameRegex.test(username);
}


export {usernameValidator};