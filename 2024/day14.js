class Robot {
  // MAX INDEX
  // for ex: x=10, y=6
  // for real data : x=100, y=102
  static maxX = 100;
  static maxY = 102;
  constructor(x, y, vx, vy) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
  }
  nextSecond() {
    let newX = this.x + this.vx;
    if (newX > Robot.maxX) newX = (newX - Robot.maxX) - 1;
    if (newX < 0) newX += Robot.maxX + 1;
    this.x = newX;

    let newY = this.y + this.vy;
    if (newY > Robot.maxY) newY = (newY - Robot.maxY) - 1;
    if (newY < 0) newY += Robot.maxY + 1;
    this.y = newY;
  }
  /**
   *
   * @param {Robot[]} arr
   */
  static getRobotsInQuadrantsMultiplied(arr) {
    // max X quadrant top
    const maxXQT = Math.floor(Robot.maxX / 2) - 1;
    // min X quadrant bottom
    const minXQB = Math.ceil(Robot.maxX / 2) + 1;
    // max Y quadrant left
    const maxYQL = Math.floor(Robot.maxY / 2) - 1;
    // min Y quadrant right
    const minYQR = Math.ceil(Robot.maxY / 2) + 1;

    // quandrant [top/bottom] [left/right]
    const qtl = [];
    const qtr = [];
    const qbl = [];
    const qbr = [];

    arr.forEach((robot) => {
      if (robot.x >= 0 && robot.x <= maxXQT) {
        // TOP SIDE
        if (robot.y >= 0 && robot.y <= maxYQL) {
          // TOP LEFT
          qtl.push(robot);
        } else if (robot.y >= minYQR && robot.y <= Robot.maxY) {
          // TOP RIGHT
          qtr.push(robot);
        }
      } else if (robot.x >= minXQB && robot.x <= Robot.maxX) {
        // BOTTOM
        if (robot.y >= 0 && robot.y <= maxYQL) {
          // BOT LEFT
          qbl.push(robot);
        } else if (robot.y >= minYQR && robot.y <= Robot.maxY) {
          // BOT RIGHT
          qbr.push(robot);
        }
      }
    });

    return qtl.length * qtr.length * qbl.length * qbr.length;
  }
  /**
   * Displays the robot's positions on the console
   * @param {Robot[]} robotArray 
   * @param {string} [charRobot="X"] Char to display on the console where a robot is present
   * @param {string} [charNothing=" "] Char to display when nothing's on the tile
   */
  static visualizeArray(robotArray, charRobot="X", charNothing=" ") {
    for (let y = 0; y <= Robot.maxY; y++) {
      const visualArray = []
      for (let x = 0; x <= Robot.maxX; x++) {
        if (this.arrayContainsRobotAt(robotArray,x,y))
          visualArray.push(charRobot)
        else
          visualArray.push(charNothing)
      }
      console.log(visualArray.join(''))
    }
  }
  /**
   * 
   * @param {Robot[]} robotArray 
   * @param {Number} x 
   * @param {Number} y 
   * @returns {Boolean} true if the tile contains a robot
   */
  static arrayContainsRobotAt(robotArray, x,y) {
    return robotArray.filter((v) => v.x == x && v.y == y).length != 0
  }
}

console.time("Day14 Part1")
const robotArray = [];
const input = require("fs").readFileSync("./data.txt").toString().split("\r\n");

input.forEach((line) => {
  const [currPos, speed] = line.split(" ");
  const [x, y] = currPos.substring(2).split(",");
  const [vx, vy] = speed.substring(2).split(",");
  robotArray.push(new Robot(Number(x), Number(y), Number(vx), Number(vy)));
});

for (i = 0; i < 100; i++) {
  robotArray.forEach((r) => r.nextSecond());
}

console.log(Robot.getRobotsInQuadrantsMultiplied(robotArray));
console.timeEnd("Day14 Part1")  // 18ms

// Part 2
// Tried to check manually
let num = 100
t()
function t() {
  num++
  setTimeout(t,3000)
  robotArray.forEach((r) => r.nextSecond())
  console.log("_______________________________", num)
  Robot.visualizeArray(robotArray)
}