const input = require("fs").readFileSync("./data.txt").toString();
const data = [];
const direction = ["^", "v", "<", ">"];
const guard = {
  lin: -1,
  col: -1,
};

input.split("\r\n").forEach((l, i) => {
  data.push(l.split(""));
  data[i].forEach((v, j) => {
    if (direction.includes(data[i][j])) {
      guard.lin = i;
      guard.col = j;
    }
  });
});

while (!move_forward()) {}

let count = 0;
data.forEach((l, i) => {
  l.forEach((c, j) => {
    if (data[i][j] == "X") count++;
  });
});
console.log(count);

function move_forward() {
  let nextLin = guard.lin;
  let nextCol = guard.col;
  switch (getCurrDirection()) {
    case "^":
      nextLin = guard.lin - 1;
      break;
    case ">":
      nextCol = guard.col + 1;
      break;
    case "v":
      nextLin = guard.lin + 1;
      break;
    case "<":
      nextCol = guard.col - 1;
      break;
  }
  if (
    nextLin < 0 ||
    nextLin >= data.length ||
    nextCol < 0 ||
    nextCol >= data[nextLin].length
  ) {
    data[guard.lin][guard.col] = "X";
    return true;
  }
  if (data[nextLin][nextCol] == "#") {
    turn();
    return move_forward();
  } else {
    data[nextLin][nextCol] = getCurrDirection();
    data[guard.lin][guard.col] = "X";
    guard.lin = nextLin;
    guard.col = nextCol;
    return false;
  }
}

function turn() {
  switch (getCurrDirection()) {
    case "^":
      data[guard.lin][guard.col] = ">";
      break;
    case ">":
      data[guard.lin][guard.col] = "v";
      break;
    case "v":
      data[guard.lin][guard.col] = "<";
      break;
    case "<":
      data[guard.lin][guard.col] = "^";
      break;
  }
}

function getCurrDirection() {
  return data[guard.lin][guard.col];
}
