import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const fileName = fileURLToPath(import.meta.url);
const dirName = path.dirname(fileName);

const inputs = readFileSync(path.join(dirName, '../day04.txt'), 'utf-8');
console.log('inputs : ', inputs);
const arr = inputs.split('\n\n');

for (let str of arr) {
  str = str.replace('\n', ' ');
  const refinedarr = str.split(' ');
  console.log('refined arr : ', refinedarr);
  

}




