import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const fileName = fileURLToPath(import.meta.url);
const dirName = path.dirname(fileName);

const inputs = readFileSync(path.join(dirName, "../day04.txt"), "utf-8");
const arr = inputs.split("\n\n");

const requiredarr = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
let totalvalid = 0;
for (let str of arr) {
  const requiredMap = new Map();
  for (const req of requiredarr) {
    requiredMap.set(str, false);
  }
  str = str.replace(/\n/g, " ");
  const refinedarr = str.split(" ");
  for (let prop of refinedarr) {
    if (prop != "") {
      const temp = prop.split(":");
      requiredMap.set(temp[0], true);
    }
  }
  if (isvalid(requiredMap, requiredarr)) {
    totalvalid++;
  }
}
console.log('total valid : ', totalvalid);

function isvalid(reqMap, reqArr) {
  console.log('Entering isvalid function : ');
  console.log('req map : ', reqMap);
  console.log('req arr : ', reqArr);
  for (const req of reqArr) {
    if (!reqMap.get(req)) {
      return false;
    }
  }
  return true;
}
