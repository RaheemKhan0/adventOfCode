import { fileURLToPath } from "url";
import path from "path";
import { readFileSync } from "fs";

const filepath = fileURLToPath(import.meta.url);
const dirpath = path.dirname(filepath);
const inputs = readFileSync(path.join(dirpath, "../day06.txt"), "utf-8");
const arrinput = inputs.trim().split("\n\n");

let i = 0;
let sumQuestionCount = 0;
let totalAllQuestionAns = 0;
while (i < arrinput.length) {
  let curString = arrinput[i];
  let curStringarr = curString.split("\n");
  let totalpersons = curStringarr.length;
  console.log('totalpersons : ', totalpersons);
  const charmap = new Map();

  const set = new Set();
  for (const str of curStringarr) {
    for (const c of str) {
      if (!set.has(c)) set.add(c);
      charmap.set(c, (charmap.get(c) ?? 0) + 1);
    }
  }
  console.log('char keys : ', charmap.keys());
  for (const value of charmap.values()) {
    if (value == totalpersons) {
      totalAllQuestionAns++;
    }
  }
  sumQuestionCount += set.size;
  i++;
}
console.log("total sum : ", sumQuestionCount);
console.log("total questions answered by everyone : ", totalAllQuestionAns);
