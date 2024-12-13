class ClawMachine {
  /**
   * 
   * @param {String} input 
   * @param {Boolean} task2 true if used for task2
   */
  constructor(input, task2 = false) {
    const d = input.split("\r\n");
    const [ax, ay] = d[0].match(/[+-]\d{1,}/gi).map((_) => Number(_));
    this.a = {
      x: ax,
      y: ay,
    };
    const [bx, by] = d[1].match(/[+-]\d{1,}/gi).map((_) => Number(_));
    this.b = {
      x: bx,
      y: by,
    };

    const [px, py] = d[2]
      .match(/[=]\d{1,}/gi)
      .map((_) => Number(_.substring(1)));
    this.prize = {
      x: px,
      y: py
    };
    if (task2) {
      this.prize.x += 10000000000000
      this.prize.y += 10000000000000
    }
  }
}

const input = require("fs")
  .readFileSync("./data.txt")
  .toString()
  .split("\r\n\r\n");

//#region Task 1
console.time("Day13 Task1")
let tokens = 0
input.forEach((x) => {
  cm = new ClawMachine(x, false);
  /*
  px = m * ax + 3n * bx
  py = m * ay + 3n * by

  m = (py-n*by)/ay
  n = (px-py*ax/ay)/(bx - by*ax/ay)
  */

  const nB = 3 * (cm.a.y * cm.prize.x - cm.a.x * cm.prize.y) / (3 * (cm.a.y * cm.b.x - cm.a.x * cm.b.y))
  const nA = (cm.prize.x - nB * cm.b.x) / cm.a.x

  if (nB <= 100 && nA <= 100 && nA * cm.a.x + nB * cm.b.x == cm.prize.x && nA * cm.a.y + nB * cm.b.y == cm.prize.y && Math.round(nA) == nA && Math.round(nB) == nB) {
    // A button costs 3
    tokens += 3 * nA + nB
  }
});

console.timeEnd("Day13 Task1")  // 2ms
console.log("Task1:",tokens)
//#endregion Task 1
//#region Task 2
console.time("Day13 Task2")
tokens = 0

input.forEach((x) => {
  cm = new ClawMachine(x, true);

  const nB = 3 * (cm.a.y * cm.prize.x - cm.a.x * cm.prize.y) / (3 * (cm.a.y * cm.b.x - cm.a.x * cm.b.y))
  const nA = (cm.prize.x - nB * cm.b.x) / cm.a.x

  // removed 100 button press limit
  if (nA * cm.a.x + nB * cm.b.x == cm.prize.x && nA * cm.a.y + nB * cm.b.y == cm.prize.y && Math.round(nA) == nA && Math.round(nB) == nB) {
    // A button costs 3 tokens, B costs 1 token
    tokens += 3 * nA + nB
  }
});

console.timeEnd("Day13 Task2")  // 1.6 ms (less than task1)
console.log("Task2:",tokens)
//#endregion Task 2