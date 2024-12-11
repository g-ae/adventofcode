const input = require("fs").readFileSync("./data.txt").toString();

let data = {}
/*
data type :
{
  '8': 1
}
*/
input.split(' ').forEach(v => addToDict(data,v))

console.log(data)

console.time("Day11 Task2")

function blink() {
  /*
    Rules :
    - if == 0 : becomes 1
    - if length is even, left half becomes one stone, right half becomes another
    - else : n times 2024
    */
  const arr = {};
  Object.keys(data).forEach((x) => {
    if (x == '0')  addToDict(arr, 1, data[x])
    else if (x.toString().length % 2 == 0) {
      addToDict(arr, Number(x.substring(0, Math.floor(x.length / 2))), data[x]);
      addToDict(arr, Number(x.substring(Math.floor(x.length / 2))), data[x]);
    }
    else addToDict(arr, x * 2024, data[x])
  });
  data = arr
  //console.log(data)
}

function addToDict(dict, data, times = 1) {
  if (dict[data] == undefined) dict[data] = times
  else dict[data] = dict[data] + times
}

for (i = 0; i < 75; i++) {
    console.clear()
    console.log("Current : ",i)
    blink()
}

console.clear()
console.timeEnd("Day11 Task2")
var count = 0

Object.keys(data).forEach(x => {
  count += data[x]
})

console.log(count)