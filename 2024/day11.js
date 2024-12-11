const input = require("fs").readFileSync("./data.txt").toString();
let data = input.split(' ')

console.time("Day11 Task1")
function blink() {
  /*
    Rules :
    - if == 0 : becomes 1
    - if length is even, left half becomes one stone, right half becomes another
    - else : n times 2024
    */
  const arr = [];
  data.forEach((x) => {
    if (x == 0) arr.push(1);
    else if (x.toString().length % 2 == 0) {
      const str = x.toString();
      arr.push(Number(str.substring(0, Math.floor(str.length / 2))));
      arr.push(Number(str.substring(Math.floor(str.length / 2))));
    }
    else arr.push(x * 2024)
  });
  data = arr
}

for (i = 0; i < 25; i++) {
    console.clear()
    console.log("Current : ",i)
    blink()
}
console.clear()
console.timeEnd("Day11 Task1")
console.log(data.length)