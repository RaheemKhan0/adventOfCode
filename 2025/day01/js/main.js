import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const dir = path.dirname(__filename);
const inputs = readFileSync(path.join(dir, "../day01.txt"), "utf8");
const processinput = inputs.split("\n");
let dial = 50;
let res = 0;

function processInput(dial, str = "") {
  if (!str) return;

  const dir = str[0];
  const arr = str.split(/[A-Za-z]/);
  const val = Number(arr[1]);
  console.log(arr);
  if (val > 100) {
   const overval =  Math.floor(val / 100);
    res += overval;
    console.log('overval : ' , overval);
  }
  let modval = val % 100;

  if (!dir || !val) {
    return;
  }
  if (dir == "L") {
    let diff = dial - modval;
    if (diff < 0) {
      console.log('difference res : ' , res);
      res += 1;
      return 100 + diff;
    }
    return diff;
  } else {
    let add = dial + modval;
    if (add >= 100) {
      console.log('adding res : ' , res);
      res += 1;
      return 0 + (add % 100);
    }
    return add;
  }
}

for (const str of processinput) {
  dial = processInput(dial, str);
  console.log('dial : ',  dial);
  if (dial == 0) {
    res += 1;
  }
}
console.log(res);
