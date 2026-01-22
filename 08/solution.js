import fs from "fs";
import path from "path";

const input = fs
  .readFileSync(path.join(import.meta.dirname, "test_input.txt"), "utf8")
  .trim();

const lines = input.split(/\r?\n/);

const allPoints = lines.map((line) => line.split(",").map(Number));

let edges = [];

for (let i = 0; i < allPoints.length; i++) {
  for (let j = i + 1; j < allPoints.length; j++) {
    let distance = getDistance(allPoints[i], allPoints[j]);
    edges.push({
      point: [i, j],
      distance,
    });
  }
}

edges.sort((a, b) => a.distance - b.distance);

for (const x of edges) {
}
const getDistance = (point1, point2) => {
  let temp =
    (point1[0] - point2[0]) ** 2 +
    (point1[1] - point2[1]) ** 2 +
    (point1[2] - point2[2]) ** 2;
  let dist = Math.sqrt(temp);
  return dist;
};
