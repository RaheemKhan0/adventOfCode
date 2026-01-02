import { readFileSync } from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url);
const dir = path.dirname(__filename);
const inputs = readFileSync(path.join(dir, "../day01.txt"), "utf8");
const DIAL = 50;
let password = 0;




function processInput(str="") {
  if (!str) return
  
}
