import { notDeepStrictEqual } from "assert";
import fs from "fs";
import path from "path";

const input = fs
  .readFileSync(path.join(import.meta.dirname, "input.txt"), "utf8")
  .trim();

const secondPart = (line, index, len, dp) => {
  if (len === 12) return "";
  if (index === line.length) return "";

  if (dp[index][len] !== undefined) {
    return dp[index][len];
  }
  let pick = "";
  if (len < 12) {
    pick = line[index] + secondPart(line, index + 1, len + 1, dp);
  }

  const notPick = secondPart(line, index + 1, len, dp);

  const result =
    notPick === "" || Number(pick) > Number(notPick) ? pick : notPick;

  dp[index][len] = result;
  return result;
};

const getBest12DigitNumber = (line) => {
  const dp = Array.from({ length: line.length + 1 }, () =>
    Array(13).fill(undefined)
  );
  return secondPart(line, 0, 0, dp);
};

const lines = input.split(/\r?\n/);
let ans = 0;
for (const line of lines) {
  ans = ans + Number(getBest12DigitNumber(line, 0, ""));
}

const firstPart = (line) => {
  let maxJolts = 0;
  let firstDigit = 0;
  let firstDigitIndex = -1;
  let lastDigit = 0;
  for (let i = 0; i < line.length - 1; i++) {
    if (firstDigit < line[i]) {
      firstDigit = line[i];
      firstDigitIndex = i;
    }
  }
  let secondDigit = 0;
  for (let j = line.length - 1; j > firstDigitIndex; j--) {
    if (secondDigit < line[j]) {
      secondDigit = line[j];
    }
  }

  maxJolts = firstDigit + secondDigit;
  ans = ans + Number(maxJolts);
};
console.log(ans);
