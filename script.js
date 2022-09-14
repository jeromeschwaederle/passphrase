// #####################################################
// Selections

const warningElement = document.querySelector(".warning");
const inputNumberOfWordsForPassphrase = document.querySelector("input");
const btnNewPassword = document.querySelector(".btnSubmit");
const statsElement = document.querySelector(".stats");
const passphraseElement = document.querySelector(".password");

// #####################################################
// Passphrase Fonctions

function makePassphrase(numberOfWords) {
  return createRandomInt8Values(numberOfWords * 11);
}

function createRandomInt8Values(numberOfValues) {
  const arrRandomValues = new Int8Array(numberOfValues);
  window.crypto.getRandomValues(arrRandomValues);
  return turnRandomValuesIntoBinaryString(arrRandomValues);
}

function turnRandomValuesIntoBinaryString(arrRandomValues) {
  const binaryString = arrRandomValues.map(randomNumber => (randomNumber >= 0 ? 1 : 0)).join("");
  return makeArrOf11Bits(binaryString, inputNumberOfWordsForPassphrase.value);
}

function makeArrOf11Bits(binaryString, numberOfWordsForPassphrase) {
  const arrayOf11Bits = [];
  for (let i = 0; i < numberOfWordsForPassphrase; i++)
    arrayOf11Bits.push(binaryString.slice(i * 11, (i + 1) * 11));
  return turn11BitsArrayIntoPassphrase(arrayOf11Bits);
}

function turn11BitsArrayIntoPassphrase(arrayOf11Bits) {
  const passphrase = arrayOf11Bits
    .map(bits => parseInt(bits, 2))
    .map(number => wordList[number])
    .join(" - ");
  return passphrase;
}

// #####################################################
// UI Fonctions

const setElementTextContent = (element, content) => (element.textContent = content);
const showElement = element => void element.classList.remove("hide");
const hideElement = element => void element.classList.add("hide");

const setTextAndShowElements = elements => {
  elements.map(element => {
    setElementTextContent(element.name, element.text);
    showElement(element.name);
  });
};

const warn = message => {
  hideElement(passphraseElement);
  hideElement(statsElement);
  setElementTextContent(warningElement, message);
  showElement(warningElement);
};

const sureInt = number => Math.floor(Number(number));

// #####################################################
// Event Handler

function clickHandler(event) {
  event.preventDefault();
  const numberInt = sureInt(inputNumberOfWordsForPassphrase.value);
  inputNumberOfWordsForPassphrase.value = numberInt;
  sideEffectsDependingOnNumber(numberInt);
}

function sideEffectsDependingOnNumber(number) {
  if (number <= 0) warn("Merci de rentrer un entier positif...");
  if (number > 5000) warn("Merci de rentrer un entier positif inférieur à 5001.");
  if (number > 0 && number <= 5000) numberIsInRangeEffects(number);
}

function numberIsInRangeEffects(number) {
  hideElement(warningElement);
  setTextAndShowElements([
    { name: statsElement, text: `${number * 11} bits d'entropie.` },
    { name: passphraseElement, text: makePassphrase(number) },
  ]);
  statsElement.scrollIntoView({ behavior: "smooth" });
}

// #####################################################
// Events

btnNewPassword.addEventListener("click", clickHandler);
