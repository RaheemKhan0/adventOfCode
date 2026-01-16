import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const dir = path.dirname(__filename);
const inputs = readFileSync(path.join(dir, "../day01.txt"), "utf8");
const processedinput = inputs.split("\n");
let dial = 50;
let res = 0;

function processInput(currentDial, str = "") {
  if (!str.trim()) return currentDial; // Return current position if string is empty

  const direction = str[0];
  const value = Number(str.slice(1));

  let newDial;

  if (direction === "R") {
    // 1. Calculate the 'theoretical' ending position without wrapping yet
    const target = currentDial + value;

    // 2. How many times did we cross a '100' boundary?
    // If we are at 50 and go to 110, (110/100) floor is 1.
    // If we are at 50 and go to 210, (210/100) floor is 2.
    res += Math.floor(target / 100);

    // 3. Set the actual dial position using modulo
    newDial = target % 100;
  } else {
    // 1. For Left, we subtract.
    // Example: dial 10, move L20 -> target is -10.
    const target = currentDial - value;

    // 2. In Math.floor, -0.1 becomes -1, and -1.1 becomes -2.
    // This perfectly tracks how many times we passed 0 going backwards!
    // We take the absolute value of the floor of (target/100) if it's negative.
    if (target < 0) {
      // This counts how many times we crossed 0, -100, -200 etc.
      res += Math.ceil(Math.abs(target) / 100);

      // If we land EXACTLY on a multiple of 100 (like -100, -200)
      // coming from the right, your logic needs to decide if that
      // counts as 'crossing' or 'landing'.
      // Standard AoC logic: if target % 100 == 0, we landed on it.
    }

    // 3. Keep the dial in the 0-99 range
    newDial = ((target % 100) + 100) % 100;
  }

  return newDial;
}
for (const str of processedinput) {
  console.log("dial : ", dial);
  dial = processInput(dial, str);
  console.log("res dial : ", dial);
  console.log("\n");
}
console.log(res);
