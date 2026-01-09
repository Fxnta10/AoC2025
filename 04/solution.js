import fs from "fs";
import path from "path";

const input = fs
  .readFileSync(path.join(import.meta.dirname, "test_input.txt"), "utf8")
  .trim();

let grid = input.split(/\r?\n/).map((row) => row.split(""));
let count = 0;

const directions = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
  [1, 1],
  [1, -1],
  [-1, 1],
  [-1, -1],
];

const checkValid = (i, j) => {
  let neighbors = 0;

  for (const [dx, dy] of directions) {
    const ni = i + dx;
    const nj = j + dy;

    if (
      ni >= 0 &&
      ni < grid.length &&
      nj >= 0 &&
      nj < grid[ni].length &&
      grid[ni][nj] === "@"
    ) {
      neighbors++;
      if (neighbors >= 4) return false;
    }
  }

  return true;
};

let removed = true;

while (removed) {
  removed = false;
  const toRemove = [];

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === "@" && checkValid(i, j)) {
        toRemove.push([i, j]);
      }
    }
  }

  if (toRemove.length > 0) {
    removed = true;
    count += toRemove.length;

    for (const [i, j] of toRemove) {
      grid[i][j] = "x";
    }
  }
}

console.log(count);

const partOne = () => {
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
      if (lines[i][j] === "@" && checkValid(i, j)) {
        count = count + 1;
      }
    }
  }
};
