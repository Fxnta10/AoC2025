import { time } from "console";
import fs from "fs";
import path from "path";

const input = fs
  .readFileSync(path.join(import.meta.dirname, "input.txt"), "utf8")
  .trim();

let grid = input.split(/\r?\n/).map((row) => row.split(""));

let start = [];
for (let j = 0; j < grid[0].length; j++) {
  if (grid[0][j] == "S") {
    start = [0, j];
  }
}

// const str = grid.map((row) => row.join("")).join("\n");
// console.log(str);
let timeLines = 0;
let m = grid.length;
let n = grid[0].length;
let dp = Array.from({ length: m }, () => Array(n).fill(-1));

const iterate2 = (i, j) => {
  if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length) {
    return 0;
  }
  if (dp[i][j] != -1) return dp[i][j];
  // const key = `${i}x${j}`;
  if (grid[i][j] === "^") {
    // timeLines++;
    // console.log(timeLines);
    return (dp[i][j] = 1 + iterate2(i, j + 1) + iterate2(i, j - 1));
    // return;
  }
  grid[i][j] = "|";
  return (dp[i][j] = iterate2(i + 1, j));
};

//because there is one timeline by default
const ans = 1 + iterate2(start[0], start[1]);
console.log(ans);
iterate2(start[0], start[1]);
// console.log(timeLines);

const firstPart = () => {
  let splits = 0;
  let visited = new Set();

  const iterate = (i, j) => {
    if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length) {
      return;
    }
    const key = `${i}x${j}`;
    if (visited.has(key)) {
      return;
    }
    visited.add(key);
    if (grid[i][j] === "^") {
      splits++;

      iterate(i, j + 1);
      iterate(i, j - 1);
      return;
    }
    grid[i][j] = "|";
    iterate(i + 1, j);
  };
  // console.log(time);
};
