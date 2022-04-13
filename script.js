import { makePassword, surePosInt } from "./functions.js";

// Selections

const title = document.querySelector(".title");
const inputNumberWords = document.querySelector("input");
const btnNewPassword = document.querySelector(".create_password");
const stats = document.querySelector(".stats");
const password = document.querySelector(".password");

// Init

inputNumberWords.defaultValue = "8";

// Events

btnNewPassword.addEventListener("click", function (e) {
  e.preventDefault();
  const number = surePosInt(inputNumberWords.value);
  inputNumberWords.value = number;
  if (number === 0) title.textContent = "Merci de rentrer un entier positif...";
  else if (number > 5000) title.textContent = "Merci de rentrer un entier positif inférieur 5001.";
  else {
    password.textContent = makePassword(number);
    stats.textContent = `En ayant connaissance des 2048 mots de la liste, ${
      number * 11
    } bits d'entropie.`;
  }
});
