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

let at0 = false;

for (const line of lines) {
  const direction = line[0];
  const magnitude = Number(line.slice(1));

  console.log("Current :", currPosition);
  console.log("Count:", count);
  console.log(direction, magnitude);

  let startsAt0 = currPosition === 0;

  if (direction === "L") {
    currPosition = currPosition - magnitude;
    console.log("new position:", currPosition);

    while (currPosition <= 0) {
      count++;
      if (startsAt0) {
        count--;
        startsAt0 = false;
      }
      if (currPosition !== 0) {
        currPosition += 100;
      } else {
        break;
      }
      console.log("overshoot left:", { count, currPosition });
    }
  } else if (direction === "R") {
    currPosition = currPosition + magnitude;
    console.log("new position:", currPosition);

    while (currPosition >= 100) {
      count++;
      currPosition = currPosition - 100;
      console.log("overshoot left:", { count, currPosition });
    }
  }
}

console.log("finalCount:", count);
