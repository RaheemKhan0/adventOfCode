import path from "path";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";

class SeatFinder {
  constructor() {}

  static findRow = (ticket = "") => {
    let row = 0;
    let upperLimit = 127;
    let lowerLimit = 0;
    for (const c of ticket) {
      if (c == "F") {
        upperLimit = Math.floor((upperLimit + lowerLimit) / 2);
      } else if (c == "B") {
        lowerLimit = Math.ceil((upperLimit + lowerLimit) / 2);
      }
      if (upperLimit == lowerLimit) {
        row = upperLimit;
      }
    }
    return row;
  };
  static findCol(ticket = "") {
    let right = 7;
    let left = 0;
    for (const c of ticket) {
      if (c == "R") {
        left = Math.ceil((right + left) / 2);
      } else if (c == "L") {
        right = Math.floor((right + left) / 2);
      }
    }
    if (ticket[ticket.length - 1] == "R") {
      return right;
    }
    return left;
  }
  static seatId(row, col) {
    return row * 8 + col;
  }
}

const filepath = fileURLToPath(import.meta.url);
const dirpath = path.dirname(filepath);
const inputs = readFileSync(path.join(dirpath, "../day05.txt"), "utf-8");

const ticketarr = inputs.split("\n");
let seatIdarr = [];

let maxSeatID = 0;
for (const tickets of ticketarr) {
  const rows = SeatFinder.findRow(tickets.substring(0, 7));
  const cols = SeatFinder.findCol(tickets.substring(7, 9));
  const seatId = SeatFinder.seatId(rows, cols);
  seatIdarr.push(parseInt(seatId));
  if (maxSeatID < seatId) {
    console.log(
      `seat Id ${seatId} is greater than the max seat Id : ${maxSeatID}`,
    );
    maxSeatID = seatId;
  }
}
console.log("Max Seat Id : ", maxSeatID);

seatIdarr = seatIdarr.sort((a, b) => a - b);

let res;
for (let i = 1; i <= seatIdarr.length - 2; i++) {
  console.log(
    `if : seatId: ${seatIdarr[i]} + 2 == seatIdarr[i + 1] ${seatIdarr[i + 1]}`,
  );
  if (seatIdarr[i + 1] === seatIdarr[i] + 2) {
    // If the difference is 2, the missing ID is the one in between
    res = seatIdarr[i] + 1;
    console.log("our seat id : ", res);
    break;
  }
}
console.log("our seat id : ", res);
