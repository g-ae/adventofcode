const input = require("fs").readFileSync("./data.txt").toString()
const lines = input.split("\r\n")
//console.log(lines)
let num = 0

const data = Array(lines.length)
for (i = 0; i < lines.length; i++) {
    data[i] = lines[i].split("")
}

// horizontal - regex
const h1 = input.match(/XMAS/gim)
num += h1 != null ? h1.length : 0
const h2 = input.match(/SAMX/gim)
num += h2 != null ? h2.length : 0

// diagonal + vert
for(i = 0; i < data.length; i++) {
    for (j = 0; j < data[i].length; j++) {
        if (data[i][j] == "X") {
            // diag
            if (i >= 3 && j >=3) num += checkOtherLetters(i,j,"X",-1,-1) ? 1 : 0    //left-up
            if (i >= 3 && j < data[i].length - 3) num += checkOtherLetters(i,j,"X",-1,+1) ? 1 : 0  //left-down
            if (i < data.length - 3 && j >= 3) num += checkOtherLetters(i,j,"X",+1,-1) ? 1 : 0   // right-up
            if (i < data.length - 3 && j < data[i].length - 3) num += checkOtherLetters(i,j,"X",1,1) ? 1 : 0 // right-down
            // vert
            if (i >= 3) num += checkOtherLetters(i,j,"X",-1,0) ? 1 : 0
            if (i < data.length - 3) num += checkOtherLetters(i,j,"X",+1,0) ? 1 : 0
            /* horizontal no regex
            // h
            if (j >= 3) num += checkOtherLetters(i,j,"X",0,-1) ? 1 : 0
            if (j < data.length - 3) num += checkOtherLetters(i,j,"X",0,1) ? 1 : 0
            */
        }
    }
}

console.log(num)

/**
 * 
 * @param {*}lin
 * @param {*} col 
 * @param {*} foundBefore 
 * @param {*} linNext + or - 1
 * @param {*} colNext + or - 1
 * @returns {Boolean} Good or not
 */
function checkOtherLetters(lin,col, foundBefore,linNext, colNext) {
    let nextLetter = ""
    //console.log("START", foundBefore,lin, col, foundBefore == data[x][y])
    switch (foundBefore) {
        case "X": 
            nextLetter = "M"
            break;
        case "M": 
            nextLetter = "A"
            break;
        case "A": 
            nextLetter = "S"
            break;
        case "S": { 
            return true
        }
    }
    if (nextLetter == "") return false
    //console.log("next",data[x +linNext][y + colNext])
    if (data[lin + Number(linNext)][col + Number(colNext)] == nextLetter) return checkOtherLetters(lin + Number(linNext), col + Number(colNext), nextLetter,linNext, colNext)
    else return false
}

// Task 2
/**
 * 
 * @param {Number}linx location of A
 * @param {Number} col col location of A
 */
function checkForXShapedMAS(lin,col) {
    let topLeftIsM = null
    let topRightIsM = null

    let right = true

    if (data[lin-1][col-1] == "M") topLeftIsM = true
    else if (data[lin-1][col-1] == "S") topLeftIsM = false
    else return false

    if (data[lin-1][col+1] == "M") topRightIsM = true
    else if (data[lin-1][col+1] == "S") topRightIsM = false
    else return false

/*
    console.log(topLeftIsM, data[lin-1][col-1], data[lin+1][col+1])
    console.log(topRightIsM, data[lin-1][col+1], data[lin+1][col-1])
*/

    if (topLeftIsM && data[lin+1][col+1] != "S") right = false
    if (topRightIsM && data[lin+1][col-1] != "S") right = false
    if (!topLeftIsM && data[lin+1][col+1] != "M") right = false
    if (!topRightIsM && data[lin+1][col-1] != "M") right = false

    return right
}

let numOfX_MAS = 0

for(i = 0; i < data.length; i++) {
    for (j = 0; j < data[i].length; j++) {
        if (data[i][j] == "A") {
            if (i >= 1 && i < data.length - 1 && j >= 1 && j < data[i].length - 1) {
                numOfX_MAS += checkForXShapedMAS(i,j) ? 1 : 0
            }
        }
    }
}
console.log("Number of X-MAS :", numOfX_MAS)