import { wordList } from "./wordList.js";

const warningElement = document.querySelector(".warning");
const inputNumberOfWordsForPassphrase = document.querySelector("input");
const btnNewPassword = document.querySelector(".btnSubmit");
const statsElement = document.querySelector(".stats");
const passphraseElement = document.querySelector(".password");

btnNewPassword.addEventListener("click", clickHandler);

function clickHandler(event) {
  event.preventDefault();
  const numberInt = sureInt(inputNumberOfWordsForPassphrase.value);
  inputNumberOfWordsForPassphrase.value = numberInt;
  sideEffectsDependingOnNumber(numberInt);
}

function sureInt(number) {
  return Math.floor(Number(number));
}

function sideEffectsDependingOnNumber(number) {
  if (number <= 0) warn("Merci de rentrer un entier positif...");
  if (number > 500) warn("Merci de rentrer un entier positif inférieur à 501.");
  if (number > 0 && number <= 500) numberIsInRangeEffects(number);
}

function warn(message) {
  hideThisElement(passphraseElement);
  hideThisElement(statsElement);
  setElementTextContent(warningElement, message);
  showThisElement(warningElement);
}

function hideThisElement(element) {
  element.classList.add("hide");
}

function setElementTextContent(element, content) {
  element.textContent = content;
}

function showThisElement(element) {
  element.classList.remove("hide");
}

function numberIsInRangeEffects(number) {
  hideThisElement(warningElement);
  setTextAndShowElements([
    { name: statsElement, text: `${number * 11} bits d'entropie.` },
    { name: passphraseElement, text: makePassphrase(number) },
  ]);
  statsElement.scrollIntoView({ behavior: "smooth" });
}

function setTextAndShowElements(elements) {
  elements.map(element => {
    setElementTextContent(element.name, element.text);
    showThisElement(element.name);
  });
}

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
