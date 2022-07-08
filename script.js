// Selections

const warning = document.querySelector(".warning");
const inputNumberWords = document.querySelector("input");
const btnNewPassword = document.querySelector(".btnSubmit");
const stats = document.querySelector(".stats");
const password = document.querySelector(".password");

// Fonctions

function createRandomValues(numberOfValues) {
  const arrRandom = new Int8Array(numberOfValues);
  window.crypto.getRandomValues(arrRandom);
  return arrRandom;
}

function turnRandomIntoBinary(arrRandom) {
  const result = arrRandom.map(x => (x >= 0 ? 1 : 0)).join("");
  return result;
}

function makeArrOf11Bits(bits, number_of_words) {
  const parts = [];
  let a = 0;
  let b = 11;
  for (let i = 0; i < number_of_words; i++) {
    parts.push(bits.slice(a, b));
    a += 11;
    b += 11;
  }
  return parts;
}

function turnBitsIntoWordList(arr) {
  const password = arr
    .map(bits => parseInt(bits, 2))
    .map(number => wordList[number])
    .join(" - ");
  return password;
}

function makePassword(number_of_words) {
  return turnBitsIntoWordList(
    makeArrOf11Bits(
      turnRandomIntoBinary(createRandomValues(number_of_words * 11)),
      number_of_words
    )
  );
}

function surePosInt(number) {
  if (number < 0) return 0;
  else return Math.floor(Number(number));
}

// Init

inputNumberWords.defaultValue = "8";

// Events

btnNewPassword.addEventListener("click", function (e) {
  e.preventDefault();
  const number = surePosInt(inputNumberWords.value);
  inputNumberWords.value = number;
  if (number === 0) {
    warning.textContent = "Merci de rentrer un entier positif...";
    warning.classList.remove("hide");
  } else if (number > 5000) {
    warning.textContent = "Merci de rentrer un entier positif inférieur 5001.";
    warning.classList.remove("hide");
  } else {
    warning.classList.add("hide");
    password.textContent = makePassword(number);
    stats.textContent = `${number * 11} bits d'entropie.`;
    password.scrollIntoView({ behavior: "smooth" });
  }
});
