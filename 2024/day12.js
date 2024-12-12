function findOthers(char, slin, scol) {
  if (alreadyUsed[slin][scol]) return []
  alreadyUsed[slin][scol] = true;
  const a = [[slin,scol]];
  // up
  if (slin > 0)
    if (input[slin - 1][scol] == char && !alreadyUsed[slin - 1][scol]) {
      a.push(...findOthers(char, slin - 1, scol));
    }
  // left
  if (scol > 0)
    if (input[slin][scol - 1] == char && !alreadyUsed[slin][scol - 1]) {
      a.push(...findOthers(char, slin, scol - 1));
    }
  // down
  if (slin < alreadyUsed.length - 1)
    if (input[slin+1][scol] == char && !alreadyUsed[slin + 1][scol]) {
      a.push(...findOthers(char, slin + 1, scol));
    }
  // right
  if (scol < alreadyUsed[0].length - 1)
    if (input[slin][scol + 1] == char && !alreadyUsed[slin][scol + 1]) {
      a.push(...findOthers(char, slin, scol + 1));
    }
  return a
}

function calcPerimeter(region) {
  let char = ""
  let perimeter = 0
  region.forEach(([x,y]) => {
    char = input[x][y]
    
    if (x == 0) perimeter++
    if (y == 0) perimeter++
    if (x == input.length - 1) perimeter++
    if (y == input[x].length - 1) perimeter++

    if (x > 0) if (input[x-1][y] != char) perimeter++
    if (x < input.length - 1) if (input[x+1][y] != char) perimeter++
    if (y > 0) if (input[x][y-1] != char) perimeter++
    if (y < input[x].length -1) if (input[x][y+1] != char) perimeter++
  })
  if (char == "") console.error("Char is empty. Error")
  return perimeter
}
function calcPerimeterRtnArr(region) {
  let char = ""
  let perimeter = []
  region.forEach(([x,y]) => {
    char = input[x][y]
    
    if (x == 0) perimeter.push([x,y,'^'])
    if (y == 0) perimeter.push([x,y,'<'])
    if (x == input.length - 1) perimeter.push([x,y,'v'])
    if (y == input[x].length - 1) perimeter.push([x,y,'>'])

    if (x > 0) if (input[x-1][y] != char) perimeter.push([x,y,'^'])
    if (x < input.length - 1) if (input[x+1][y] != char) perimeter.push([x,y,'v'])
    if (y > 0) if (input[x][y-1] != char) perimeter.push([x,y,'<'])
    if (y < input[x].length -1) if (input[x][y+1] != char) perimeter.push([x,y,'>'])
  })
  if (char == "") console.error("Char is empty. Error")
  return perimeter
}
//function findSidesOn(pArr, dir, min, max)
function calcNumSides(region) {
  //const char = input[region[0][0]][region[0][1]]
  const pArr = calcPerimeterRtnArr(region)
  let sides = 0

  let minX = input.length
  let minY = input[0].length
  let maxX = -1
  let maxY = -1
  // Get min x index
  pArr.forEach(([x,y]) => {
    if (x < minX) minX = x
    if (y < minY) minY = y
    if (x > maxX) maxX = x
    if (y > maxY) maxY = y
  })

  // TODO: Move to separate function for readability
  // DOWN v
  for(i = minX; i <= maxX; i++) {
    const found = pArr.filter(([x,y, dir])=> x == i && dir == 'v')
    found.sort((a,b) => a[1] - b[1])
      let lastY = -5
    found.forEach(([x,y,dir],i) => {
      if (lastY + 1 != y) sides++
      lastY = y
    })
  }
  // UP ^
  for(i = maxX; i >= minX; i--) {
    const found = pArr.filter(([x,y, dir])=> x == i && dir == '^')
    found.sort((a,b) => a[1] - b[1])
    let lastY = -5

    found.forEach(([x,y,dir],i) => {
      if (lastY + 1 != y) sides++
      lastY = y
    })
  }
  // RIGHT >
  for(i = minY; i <= maxY; i++) {
    const found = pArr.filter(([x,y, dir])=> y == i && dir == '>')
    found.sort((a,b) => a[0] - b[0])
    let lastX = -5
    found.forEach(([x,y,dir],i) => {
      if (lastX + 1 != x) sides++
      lastX = x
    })
  }
  // LEFT <
  for(i = maxY; i >= minY; i--) {
    const found = pArr.filter(([x,y, dir])=> y == i && dir == '<')
    found.sort((a,b) => a[0] - b[0])
    let lastX = -5
    found.forEach(([x,y,dir],i) => {
      if (lastX + 1 != x) sides++
      lastX = x
    })
  }
  //console.log(sides)
  return sides
}

// INPUT
const input = require("fs")
  .readFileSync("./data.txt")
  .toString()
  .split("\r\n")
  .map((x) => x.split(""));
let sum = 0;

console.time("Day12 Task1")
const alreadyUsed = new Array(input.length)
for (i = 0; i < alreadyUsed.length; i++) alreadyUsed[i] = Array(input[0].length).fill(false)

// first char: search all of same region then don't touch them again
// TASK 1
input.forEach((v, lin) => {
  v.forEach((m, col) => {
    if (alreadyUsed[lin][col]) return
    const region = findOthers(m, lin, col)
    const perimeter = calcPerimeter(region)
    const area = region.length
    sum += perimeter * area
  });
});
console.timeEnd("Day12 Task1")
console.log("Task1:",sum)


// TASK 2
sum = 0
console.time("Day12 Task2")
for (i = 0; i < alreadyUsed.length; i++) alreadyUsed[i] = Array(input[0].length).fill(false)
input.forEach((v, lin) => {
  v.forEach((m, col) => {
    if (alreadyUsed[lin][col]) return
    const region = findOthers(m, lin, col)
    const sides = calcNumSides(region)
    const area = region.length
    //console.log(m, "area:",area,"sides:", sides, sides* area)
    sum += sides * area
  });
});
console.timeEnd("Day12 Task2")
console.log("Task2:",sum)