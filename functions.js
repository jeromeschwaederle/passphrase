export { makePassword, surePosInt };
import list from "./wordList.js";

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
    .map(number => list[number])
    .join(" ");
  return password;
}

function makePassword(number_of_words) {
  return turnBitsIntoWordList(
    makeArrOf11Bits(turnRandomIntoBinary(createRandomValues(number_of_words * 11)), number_of_words)
  );
}

function surePosInt(number) {
  if (number < 0) return 0;
  else return Math.floor(Number(number));
}
