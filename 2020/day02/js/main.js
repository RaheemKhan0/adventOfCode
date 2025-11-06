import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const input = readFileSync(__dirname + "/../day02.txt", "utf8");
let validinput = 0;
// part 1
for (let i = 0; i < input.length; i++) {
  let lowerLimit;
  let upperLimit;
  const newLine = input.indexOf("\n", i);
  const line = input.slice(i, newLine);
  const arr = line.split(" ");

  if (arr.length != 3) {
    continue;
  }
  let letter = arr[1].charAt(0);
  const limitarr = arr[0].split("-");
  lowerLimit = Number(limitarr[0]);
  upperLimit = Number(limitarr[1]);
  let charcount = 0;
  for (const char of arr[2]) {
    if (char == letter) {
      charcount += 1;
    }
  }
  if (charcount >= lowerLimit && charcount <= upperLimit) {
    validinput += 1;
  }

  while (input[i] != "\n") {
    i++;
  }
}
console.log("valid inputs : ", validinput);

// part two

let validPasswords = 0;
for (let i = 0; i < input.length; i++) {
  let newLine = input.indexOf("\n", i);
  const line = input.slice(i, newLine);
  const arr = line.split(" ");
  if (arr.length != 3) {
    continue;
  }

  console.log("arr : ", arr);

  const indexarr = arr[0].split("-");

  let lowerIndex = Number(indexarr[0]);
  let upperIndex = Number(indexarr[1]);
  lowerIndex -= 1;
  upperIndex -= 1;
  console.log("lowerIndex : ", lowerIndex, "\n upper Index : ", upperIndex);

  const char = arr[1][0];
  console.log("char : ", char);
  let charcount = 0;
  for (let j = 0; j < arr[2].length; j++) {
    if (j == lowerIndex && char == arr[2][j]) {
      charcount += 1;
    }
    if (j == upperIndex && char == arr[2][j]) {
      charcount += 1;
    }
  }
  console.log("char count : ", charcount);
  if (charcount == 1) {
    console.log('this is string is valid');
    validPasswords += 1;
    console.log('valid Passwords : ', validPasswords);
  }
  
  while (input[i] != "\n") {
    i++;
  }
}
console.log("valid Passwords : ", validPasswords);
