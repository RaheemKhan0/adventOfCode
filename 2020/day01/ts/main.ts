import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = path.dirname(__filename);

const input: string = readFileSync(
  path.resolve(__dirname, "../input.txt"),
  "utf8",
);

const arr: number[] = [];

for (let index = 0; index < input.length; index++) {
  let number = "";
  while (input[index] != "\n") {
    number += input[index];
    index += 1
  }
  arr.push(Number(number));
}

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input.length; j++) {
    if (arr[i] + arr[j] == 2020) {
      console.log("result : ", arr[i] * arr[j]);
    }
  }
}

