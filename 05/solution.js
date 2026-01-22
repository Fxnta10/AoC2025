import fs from "fs";
import path from "path";

const input = fs
  .readFileSync(path.join(import.meta.dirname, "input.txt"), "utf8")
  .trim();

const [rangesPart, numbersPart] = input.split(/\r?\n\r?\n/);

const tempRanges = rangesPart.split(/\r?\n/);

const allRanges = tempRanges.map((r) => r.split("-").map(Number));

allRanges.sort((a, b) => a[0] - b[0]);
//sorting by starting point

const merged = [];
let [start, end] = allRanges[0];

for (let i = 1; i < allRanges.length; i++) {
  const [currStart, currEnd] = allRanges[i];

  if (currStart <= end + 1) {
    //end+1 to handle touching cases
    // overlapping or touching
    end = Math.max(end, currEnd);
  } else {
    merged.push([start, end]);
    start = currStart;
    end = currEnd;
  }
}
merged.push([start, end]);

console.log(merged);

let ans = 0;
for (const [s, e] of merged) {
  ans += e - s + 1;
}

console.log(ans);

console.log(ans);
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
