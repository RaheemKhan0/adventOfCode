import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const dir = path.dirname(__filename);
const inputs = readFileSync(path.join(dir, "../day01.txt"), "utf8");
const processedinput = inputs.split("\n");
let dial = 50;
let res = 0;

function processInput(dial, str = "") {
  if (!str) {
    console.log("no string");
    return;
  }

  const dir = str[0];
  console.log("direction : ", dir);
  const arr = str.split(/[A-Za-z]/);
  const val = Number(arr[1]);
  console.log("val : ", val);
  if (val > 100) {
    const overval = Math.floor(val / 100);
    res += overval;
    console.log("overval : ", overval, " adding to res = ", overval + res);
  }
  let modval = val % 100;
  if (modval == 0) return dial;

  if (!dir || !val) {
    return;
  }

  const zeromark = dial == 0;
  if (dir == "L") {
    let diff = dial - modval;
    if (diff == 0 && !zeromark) {
      res += 1;
      return diff
    }
    if (diff < 0) {
      console.log("going left and past or on zero ", res + 1);
      console.log("returning dial : ", 100 + diff);
      if (!zeromark) res += 1;
      return 100 + diff;
    }
    return diff;
  } else {
    let add = dial + modval;
    if (add > 100) {
      console.log("adding res : ", res);
      console.log("returning dial : ", add % 100);
      if (!zeromark) res += 1;
      return add % 100;
    }
    return add;
  }
}

for (const str of processedinput) {
  console.log("dial : ", dial);
  dial = processInput(dial, str);
  console.log("res dial : ", dial);
  console.log("\n");
}
console.log(res);
