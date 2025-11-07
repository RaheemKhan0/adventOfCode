import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";

const __file__ = fileURLToPath(import.meta.url);
const __dirname__ = path.dirname(__file__);
let inputs;
let arr;
try {
  inputs = readFileSync(__dirname__ + "/../day03.txt", "utf8");

  arr = inputs.split("\n");
} catch (error) {
  console.log(error);
}
const ROWS = arr.length;
const COLS = arr[0].length;

const slopes = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 7],
];
const treeEncountersArr = [];
for (const slope of slopes) {
  let r = 0;
  let c = 0;
  let treeEncounters = 0;
  while (r < ROWS) {
    if (c >= COLS) {
      c -= COLS;
    }
    console.log("arr : ", arr[r]);
    console.log(`r : ${r} , c : ${c}`);
    console.log("arr[r][c] : ", arr[r][c]);
    if (arr[r][c] == "#") {
      console.log("tree encountered : ", treeEncounters + 1);
      treeEncounters += 1;
    }
    c += 3;
    r += 1;
  }
  console.log(`tree encounters : ${treeEncounters} for slope ${slope}`);
  treeEncountersArr.push(treeEncounters);
}
console.log('arr', treeEncountersArr);
const res = treeEncountersArr.reduce((acc, curr) => acc * curr, 1);
console.log("res : ", res);
