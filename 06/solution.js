import fs from "fs";
import path from "path";

const input = fs
  .readFileSync(path.join(import.meta.dirname, "input.txt"), "utf8")
  .trim();

const lines = input.split(/\r?\n/);

const allBlank = (j) => {
  for (let i = 0; i < lines.length - 1; i++) {
    if (lines[i][j] !== " ") return false;
  }
  return true;
};

const operation = lines[lines.length - 1].trim().split(/\s+/);

let grandTotal = 0;
let columns = lines[0].length;
let operationIndex = operation.length - 1;

let tempAns = operation[operationIndex] === "*" ? 1 : 0;

for (let j = columns - 1; j >= 0; j--) {
  if (allBlank(j)) {
    operationIndex--;
    if (operationIndex < 0) break;
    grandTotal += tempAns;
    tempAns = operation[operationIndex] === "*" ? 1 : 0;

    continue;
  }

  let tempNumber = "";
  for (let i = 0; i < lines.length - 1; i++) {
    tempNumber += lines[i][j];
  }

  const num = Number(tempNumber);

  if (operation[operationIndex] === "*") {
    tempAns *= num;
  } else if (operation[operationIndex] === "+") {
    tempAns += num;
  }
}

grandTotal += tempAns;

console.log(grandTotal);

const firstPart = () => {
  const op1 = lines[0]
    .split(" ")
    .filter((s) => s !== "")
    .map(Number);

  const op2 = lines[1]
    .split(" ")
    .filter((s) => s !== "")
    .map(Number);

  const op3 = lines[2]
    .split(" ")
    .filter((s) => s !== "")
    .map(Number);

  const op4 = lines[3]
    .split(" ")
    .filter((s) => s !== "")
    .map(Number);
  let ans = 0;
  for (let i = 0; i < operation.length; i++) {
    if (operation[i] === "*") {
      let temp = op1[i] * op2[i] * op3[i] * op4[i];
      // console.log(temp);
      ans = ans + temp;
    } else if (operation[i] === "+") {
      let temp = op1[i] + op2[i] + op3[i] + op4[i];
      // console.log(temp);
      ans = ans + temp;
    }
  }
};
