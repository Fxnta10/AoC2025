import fs from "fs";
import path from "path";

const input = fs
  .readFileSync(path.join(import.meta.dirname, "input.txt"), "utf8")
  .trim();

const lines = input.split(/\r?\n/);

let currPosition = 50;
let count = 0;

const partOne_Solution = () => {
  for (const line of lines) {
    const direction = line[0];
    const magnitude = Number(line.slice(1)) % 100;

    if (direction == "L") {
      let remainder = currPosition - magnitude;
      if (remainder < 0) {
        let newPosition = remainder + 100;
        currPosition = newPosition;
      } else {
        currPosition = remainder;
      }
    } else if (direction == "R") {
      let newPosition = currPosition + magnitude;
      if (newPosition >= 100) {
        let remainder = Math.abs(100 - newPosition);
        currPosition = remainder;
      } else {
        currPosition = newPosition;
      }
    }

    if (currPosition == 0) {
      count = count + 1;
    }
    //   console.log(currPosition);
  }

  console.log(count);
  //995
};
for (const line of lines) {
  const direction = line[0];
  const tempMagnitude = Number(line.slice(1));
  const magnitude = tempMagnitude % 100;

  let multiFactor = Math.floor(tempMagnitude / 100);
  if (multiFactor === 0) multiFactor = 1;

  if (direction == "L") {
    let remainder = currPosition - magnitude;

    if (remainder < 0) {
      if (currPosition !== 0) {
        // first crossing
        count += 1;

        // additional full loops
        count += multiFactor - 1;
      }
      currPosition = remainder + 100;
    } else {
      if (remainder === 0) {
        count += 1;
        count += multiFactor - 1;
      }
      currPosition = remainder;
    }
  } else if (direction == "R") {
    let newPosition = currPosition + magnitude;

    if (newPosition >= 100) {
      if (currPosition !== 0) {
        // first crossing
        count += 1;

        // additional full loops
        count += multiFactor - 1;
      }
      currPosition = Math.abs(100 - newPosition);
    } else {
      currPosition = newPosition;
    }
  }

  //   console.log(count);
}

console.log("finalCount:", count);
