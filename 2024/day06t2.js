const input = require("fs").readFileSync("./data.txt").toString();
const data = [];
const direction = ["^", "v", "<", ">"];
let coords = [];
let guard = {
  lin: -1,
  col: -1,
  direction: "",
};

input.split("\r\n").forEach((l, i) => {
  data.push(l.split(""));
  data[i].forEach((v, j) => {
    if (direction.includes(data[i][j])) {
      guard.direction = data[i][j];
      guard.lin = i;
      guard.col = j;
    }
  });
});

const baseGuard = {
  lin: guard.lin,
  col: guard.col,
  direction: guard.direction,
};

// input ^

let count = 0;
let countbefore = count

data.forEach((l, lin) => {
  data[lin].forEach((c, col) => {
    if (guard.lin != l && guard.col != c)
      count += try_timeloop(lin, col) ? 1 : 0;
      if (countbefore != count) {
        console.log(count)
        countbefore = count
      }
  });
});

console.log(count);

function try_timeloop(lin, col) {
  coords = [];
  guard = {
    lin: baseGuard.lin,
    col: baseGuard.col,
    direction: baseGuard.direction,
  };
  const dataCopy = [];
  data.forEach((v) => dataCopy.push(Array.from(v)));
  dataCopy[lin][col] = "#";

  let ended = false;
  let res = false;

  while (!ended) {
    let result = move_forward(dataCopy);
    if (result != null) {
      ended = true;
      res = result;
    }
  }
  return res;
}

/**
 *
 * @param {*} data
 * @returns timeloop ?
 */
function move_forward(data, oldWasTurned = false) {
  let nextLin = guard.lin;
  let nextCol = guard.col;
  let horizontal = null;

  switch (guard.direction) {
    case "^":
      nextLin = guard.lin - 1;
      horizontal = false;
      break;
    case ">":
      nextCol = guard.col + 1;
      horizontal = true;
      break;
    case "v":
      nextLin = guard.lin + 1;
      horizontal = false;
      break;
    case "<":
      nextCol = guard.col - 1;
      horizontal = true;
      break;
  }

  // out of bounds
  if (
    nextLin < 0 ||
    nextLin >= data.length ||
    nextCol < 0 ||
    nextCol >= data[nextLin].length
  ) {
    data[guard.lin][guard.col] =
      data[guard.lin][guard.col] != "."
        ? "+"
        : oldWasTurned
        ? "+"
        : horizontal
        ? "-"
        : "|";
    return false;
  }
  // check for timeloop
  switch (guard.direction) {
    case "v":
    case "^":
      //if (data[nextLin][nextCol] == "|") return true;
      break;
    case "<":
    case ">":
      if (data[nextLin][nextCol] == "-") return true;
      break;
  }
  coords.forEach((v) => {
    if (
      v.from.lin == guard.lin &&
      v.from.col == guard.col &&
      v.to.lin == nextLin &&
      v.to.col == nextCol
    ) {
      return true
    }
  });

  if (data[nextLin][nextCol] == "#") {
    if (oldWasTurned) return false;
    changeDirection();
    return move_forward(data, true);
  } else {
    data[guard.lin][guard.col] =
      data[guard.lin][guard.col] != "." &&
      !direction.includes(data[guard.lin][guard.col])
        ? "+"
        : oldWasTurned
        ? "+"
        : horizontal
        ? "-"
        : "|";
    coords.push({
      from: {
        lin: guard.lin,
        col: guard.col,
      },
      to: {
        lin: nextLin,
        col: nextCol,
      },
    });
    guard.lin = nextLin;
    guard.col = nextCol;
    return null;
  }
}

function datalog(data) {
  data.forEach((v, i) => {
    console.log(data[i].join(""));
  });
}

function changeDirection() {
  switch (guard.direction) {
    case "^":
      guard.direction = ">";
      break;
    case ">":
      guard.direction = "v";
      break;
    case "v":
      guard.direction = "<";
      break;
    case "<":
      guard.direction = "^";
      break;
  }
}
