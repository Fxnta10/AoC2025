import fs from "fs";
import path from "path";

const input = fs
  .readFileSync(path.join(import.meta.dirname, "input.txt"), "utf8")
  .trim();

const lines = input.split(/\r?\n/);

// parse coordinates
const getCords = (lines) => {
  let arr = [];
  for (const line of lines) {
    arr.push(line.split(",").map(Number));
  }
  return arr;
};

const redTiles = getCords(lines);

// map coordinates to board
const mapRedTiles = (coordinates) => {
  let maxRow = 0,
    maxCol = 0;

  for (const [r, c] of coordinates) {
    maxRow = Math.max(maxRow, r);
    maxCol = Math.max(maxCol, c);
  }

  const board = Array.from({ length: maxRow + 1 }, () =>
    Array(maxCol + 1).fill(".")
  );

  for (const [r, c] of coordinates) {
    board[r][c] = "#";
  }

  return board;
};

let board = mapRedTiles(redTiles);

//
// ROW-WISE FILL
//
for (const row of board) {
  let left = null;
  let right = null;

  for (let i = 0; i < row.length; i++) {
    if (row[i] === "#") {
      left = i;
      break;
    }
  }

  for (let i = row.length - 1; i >= 0; i--) {
    if (row[i] === "#") {
      right = i;
      break;
    }
  }

  if (left !== null && right !== null) {
    for (let i = left + 1; i < right; i++) {
      row[i] = "X";
    }
  }
}

//
// COLUMN-WISE FILL
//
for (let j = 0; j < board[0].length; j++) {
  let top = null;
  let bottom = null;

  for (let i = 0; i < board.length; i++) {
    if (board[i][j] === "#") {
      top = i;
      break;
    }
  }

  for (let i = board.length - 1; i >= 0; i--) {
    if (board[i][j] === "#") {
      bottom = i;
      break;
    }
  }

  if (top !== null && bottom !== null) {
    for (let i = top + 1; i < bottom; i++) {
      board[i][j] = "X";
    }
  }
}

//
// FINAL ROW GAP FILL (X + # as boundaries)
//
function fillGaps2D(grid) {
  for (const row of grid) {
    let left = -1;
    let right = -1;

    for (let i = 0; i < row.length; i++) {
      if (row[i] === "X" || row[i] === "#") {
        left = i;
        break;
      }
    }

    for (let i = row.length - 1; i >= 0; i--) {
      if (row[i] === "X" || row[i] === "#") {
        right = i;
        break;
      }
    }

    if (left !== -1 && right !== -1) {
      for (let i = left; i <= right; i++) {
        if (row[i] === ".") {
          row[i] = "X";
        }
      }
    }
  }
}

fillGaps2D(board);

//
// PRINT BOARD
//
// console.log(board.map((row) => row.join("")).join("\n"));

function isRectangleFilled(board, p1, p2) {
  const r1 = p1[0],
    c1 = p1[1];
  const r2 = p2[0],
    c2 = p2[1];

  const top = Math.min(r1, r2);
  const bottom = Math.max(r1, r2);
  const left = Math.min(c1, c2);
  const right = Math.max(c1, c2);

  for (let i = top; i <= bottom; i++) {
    for (let j = left; j <= right; j++) {
      if (board[i][j] === ".") {
        return false;
      }
    }
  }

  return true;
}

let maxArea = 0;

for (let i = 0; i < redTiles.length; i++) {
  for (let j = i; j < redTiles.length; j++) {
    const p1 = redTiles[i];
    const p2 = redTiles[j];

    if (isRectangleFilled(board, p1, p2)) {
      const area =
        (Math.abs(p1[0] - p2[0]) + 1) * (Math.abs(p1[1] - p2[1]) + 1);

      maxArea = Math.max(maxArea, area);
    }
  }
}

console.log("final Area :", maxArea);

const partOne = () => {
  let maxArea = 0;
  for (const line of lines) {
    const p1 = line.split(",");
    for (const line of lines) {
      const p2 = line.split(",");
      const area = Math.abs(p1[0] - p2[0] + 1) * Math.abs(p1[1] - p2[1] + 1);
      if (area > maxArea) {
        maxArea = area;
      }
    }
  }

  console.log(maxArea);
};
