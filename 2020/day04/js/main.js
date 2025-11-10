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
    requiredMap.set(req, false);
  }
  str = str.replace(/\n/g, " ");
  const refinedarr = str.split(" ");

  let valid = true;
  for (let prop of refinedarr) {
    if (prop != "") {
      const temp = prop.split(":");
      console.log("parsing : ", temp);
      if (temp.length != 2) continue;
      switch (temp[0]) {
        case "byr":
          console.log("entering byr parsing : ");
          const resbyr = isValidDate("byr", parseInt(temp[1]));
          requiredMap.set("byr", true);
          valid = valid && resbyr;
          console.log("is valid : ", valid);
          break;
        case "iyr":
          console.log("entering iyr parsing : ");
          const res = isValidDate("iyr", parseInt(temp[1]));
          requiredMap.set("iyr", true);
          console.log("is valid issue year  : ", res);
          valid = valid && res;
          break;
        case "eyr":
          console.log("entering expriration year parsing");
          const reseyr = isValidDate("eyr", parseInt(temp[1]));
          requiredMap.set("eyr", true);
          console.log("valid expiration year : ", reseyr);
          valid = valid && reseyr;
          break;
        case "hgt":
          console.log("entering height parsing");
          const reshgt = isValidHeight(temp[1]);
          requiredMap.set("hgt", true);
          console.log("height valid : ", reshgt);
          valid = valid && reshgt;
          break;
        case "hcl":
          console.log("entering hair color parsing : ");
          console.log(`valid hair color : ${isValidHCL(temp[1])}`);
          valid = valid && isValidHCL(temp[1]);
          requiredMap.set("hcl", true);
          break;
        case "ecl":
          console.log("entering eye color parsing : ");
          console.log("valid eye color : ", isValidECL(temp[1]));
          valid = valid && isValidECL(temp[1]);
          requiredMap.set("ecl", true);
          break;
        case "pid":
          console.log("entering passport id parsing : ");
          console.log("valid passport id : ", isValidPID(temp[1]));
          valid = valid && isValidPID(temp[1]);
          requiredMap.set("pid", true);
          break;
      }
    }
  }
  console.log("is valid before incrementing : ", valid);
  console.log(
    "checking have all required fields before incrementing : ",
    isvalid(requiredMap, requiredarr),
  );
  if (valid && isvalid(requiredMap, requiredarr)) {
    console.log("incrementing total valid : ", totalvalid + 1);
    totalvalid++;
  }
}
console.log("total valid : ", totalvalid);

function isvalid(reqMap, reqArr) {
  for (const req of reqArr) {
    if (!reqMap.get(req)) {
      return false;
    }
  }
  return true;
}

function isValidDate(type, date) {
  switch (type) {
    case "byr":
      return date >= 1920 && date <= 2002;
    case "iyr":
      return date >= 2010 && date <= 2020;
    case "eyr":
      return date >= 2020 && date <= 2030;
  }
}

function isValidHeight(hgt) {
  console.log("hgt : ", hgt);
  if (hgt == "") {
    return false;
  }
  const match = hgt.match(/^(\d+)(cm|in)$/);
  if (!match) {
    return false;
  }
  const type = match[2];
  console.log('height type : ', type);
  const hgtint = match[1] ;
  console.log('height integer : ', hgtint);
  if (type == "cm") {
    return hgtint >= 150 && hgtint <= 193;
  } else if (type == "in") {
    return hgtint >= 59 && hgtint <= 76;
  }
}

function isValidHCL(hcl) {
  const hclarr = hcl.split("#");
  if (hclarr.length != 2) {
    return false;
  }
  const hclpattern = /^[a-f0-9]+$/;
  return hclpattern.test(hclarr[1]);
}

function isValidECL(ecl) {
  const allowedVals = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
  const allowedSet = new Set();
  allowedVals.forEach((val) => allowedSet.add(val));
  return allowedSet.has(ecl);
}

function isValidPID(pid) {
  return /^\d{9}$/.test(pid);
}
