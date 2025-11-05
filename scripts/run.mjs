#!/usr/bin/env node
// Usage:
//  node scripts/run.mjs <year> <dayNum|dayXX> <py|js|ts> [sample|real]

import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, "..");

function die(msg) { console.error(msg); process.exit(1); }

const [,, year, rawDay, lang, which = "real"] = process.argv;
if (!year || !rawDay || !lang) die("Usage: node scripts/run.mjs <year> <dayNum|dayXX> <py|js|ts> [sample|real]");

const day = /^day\d{2}$/.test(rawDay) ? rawDay : `day${String(rawDay).padStart(2, "0")}`;

const dayDir = path.join(repoRoot, year, day);
const inputDir = path.join(repoRoot, "inputs", year);
const inputFile = path.join(inputDir, which === "sample" ? `${day}.sample.txt` : `${day}.txt`);

if (!fs.existsSync(dayDir)) die(`Day folder not found: ${dayDir}`);
if (!fs.existsSync(inputFile)) die(`Input not found: ${inputFile}`);

let cmd, args, cwd;
if (lang === "py") {
  const file = path.join(dayDir, "py", "main.py");
  if (!fs.existsSync(file)) die(`Python file not found: ${file}`);
  cmd = "python3";
  args = ["main.py", path.relative(path.join(dayDir, "py"), inputFile)];
  cwd = path.join(dayDir, "py");
} else if (lang === "js") {
  const file = path.join(dayDir, "js", "main.js");
  if (!fs.existsSync(file)) die(`JS file not found: ${file}`);
  cmd = "node";
  args = ["main.js", path.relative(path.join(dayDir, "js"), inputFile)];
  cwd = path.join(dayDir, "js");
} else if (lang === "ts") {
  const file = path.join(dayDir, "ts", "main.ts");
  if (!fs.existsSync(file)) die(`TS file not found: ${file}`);
  cmd = process.platform === "win32" ? "npx.cmd" : "npx";
  args = ["ts-node", "--transpile-only", "main.ts", path.relative(path.join(dayDir, "ts"), inputFile)];
  cwd = path.join(dayDir, "ts");
} else {
  die(`Unknown language: ${lang} (use py|js|ts)`);
}

const child = spawn(cmd, args, { stdio: "inherit", cwd });
child.on("exit", (code) => process.exit(code ?? 1));

