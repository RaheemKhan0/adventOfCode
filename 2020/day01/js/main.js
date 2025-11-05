import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const input = readFileSync(path.resolve(__dirname, "../input.txt"), "utf8");
let arr = [];
for (let index = 0; index < input.length; index++) {
  let number = "";

  while (input.charAt(index) != '\n') {
    number += input[index];
    index++;
  }
  arr.push(Number(number));
}
for (let i = 0; i < arr.length; i++) {
  for (let j = i; j < arr.length; j++) {
    if (arr[i] + arr[j] == 2020) {
      console.log(`1 : ${arr[i]}\n 2: ${arr[j]}`);
      console.log('result : ', arr[i] * arr[j]);
    }
  }
}
