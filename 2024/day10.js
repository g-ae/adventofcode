const input = require("fs").readFileSync("./data.txt").toString().split('\r\n').map(x => x.split('').map(x=>Number(x)))
let count = 0
let coords9Curr = []

console.time("Day10 Task1")

// find every 0 on the map
input.forEach((l,li) => {
    //console.log(l)
    l.forEach((num, ci) => {
        if (num == 0) {
            coords9Curr = []
            count+=next(num,li,ci)
        }
    })
})

console.timeEnd("Day10 Task1")
console.log(count)

/**
 * Looks for "nextNum" around coordinates l,c
 * @param {*} nextNum number to look for
 * @param {*} l line index
 * @param {*} c column index
 * @returns {Array[Array[Number]]} coordinates around "l,c" which have nextNum, ex: [[0,1],[2,3]]
 */
function lookForNext(nextNum, l, c) {
    const data = []

    // up
    if (l > 0) if(input[l-1][c] == nextNum) data.push([l-1,c])
    // left
    if (c > 0) if(input[l][c-1] == nextNum) data.push([l,c-1])
    // right
    if (c < input[l].length-1) if(input[l][c+1] == nextNum) data.push([l,c+1])
    // down
    if (l < input.length-1) if(input[l+1][c] == nextNum) data.push([l+1,c])

    return data
}

/**
 * if num == 8, returns num of 9's around
 * @param {*} num 
 * @param {*} l 
 * @param {*} c 
 */
function next(num, l, c) {
    //console.log(num, l ,c)
    let data = lookForNext(num+1, l,c)
    if (num+1 == 9) {
        // 
        data = data.filter(([lin,col]) => {
            return coords9Curr.filter(x =>  x[0] == lin && x[1] == col).length == 0
        })
        // add every 9's position
        coords9Curr.push(...data)

        // return 9's that weren't added already
        return data.length
    }

    let total = 0
    // if num is not 8
    data.forEach(([lin,col]) => {
        //console.log("next", num+1, lin, col)
        total += next(num+1,lin,col)
    })
    return total
}