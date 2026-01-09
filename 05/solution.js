import fs from "fs";
import path from "path";

const input = fs
  .readFileSync(path.join(import.meta.dirname, "input.txt"), "utf8")
  .trim();

const [rangesPart, numbersPart] = input.split(/\r?\n\r?\n/);

const tempRanges = rangesPart.split(/\r?\n/);

const allRanges = tempRanges.map((temp) => temp.split("-"));
const allIds = numbersPart.split(/\r?\n/);
// let count = 0;

// const mySet = new Set();

for (let i = 0; i < allRanges.length; i++) {
  let idRange = allRanges[i];
  let tempCount = idRange[1] - idRange[0] + 1;
  for (let j = 0; j < i; j++) {
    let compareId = allRanges[j];
    tempCount = tempCount - calcCommon(idRange, compareId);
  }
}

const calcCommon = (id1, id2) => {};
console.log(mySet.size);

const partOne = () => {
  for (const id of allIds) {
    for (const [low, high] of allRanges) {
      if (Number(id) >= Number(low) && Number(id) <= Number(high)) {
        //   console.log(id);
        count = count + 1;
        break;
      }
    }
  }
  console.log(count);
};
