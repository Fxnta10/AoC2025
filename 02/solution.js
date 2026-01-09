import fs from "fs";
import path from "path";
const checkInvalid = (str) => {
  for (let i = 1; i <= Math.floor(str.length / 2); i++) {
    let resultArray = splitEvery(str, i);
    const ref = resultArray[0];

    let allEqual = resultArray.every((element) => element === ref);

    if (allEqual) return false; // invalid
  }
  return true; // valid
};

function splitEvery(str, i) {
  let result = [];
  for (let j = 0; j < str.length; j += i) {
    result.push(str.slice(j, j + i));
  }
  return result;
}

const input = fs
  .readFileSync(path.join(import.meta.dirname, "input.txt"), "utf8")
  .trim();

const lines = input.split(/\r?\n/);
const tempRanges = lines[0].split(",");
const ranges = tempRanges.map((range) => range.split("-"));
let count = 0;
for (const range of ranges) {
  let low = Number(range[0]);
  let high = Number(range[1]);
  for (let i = low; i <= high; i++) {
    if (!checkInvalid(String(i))) {
      //   console.log(i);
      count += i;
    }
  }
}

console.log(count);
