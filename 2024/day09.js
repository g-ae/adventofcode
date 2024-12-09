const input = require("fs").readFileSync("./data.txt").toString();
let blocks = []
let currI = 0

console.time("Task1")

// add data to array
input.split('').forEach((n,i) => {
    if (i % 2 != 0) {
        blocks.push(...".".repeat(Number(n)))
    } else {
        for(i = 0; i < Number(n);i++) blocks.push(currI.toString())
        currI++
    }
})

// for refactor + checksum calc
let i = 0
let checksum = 0
let lastIdAddedToChecksum = 0

// every element of data
while(blocks.indexOf(".") != -1) {
    // log progress
    if (i % 1000 == 0) {
        console.clear()
        console.log(`${i}/${blocks.length}`)
    }
    // if current char is an empty space
    if (blocks[i] == ".") {
        blocks[i] = blocks[blocks.length - 1]
        blocks.pop()
    } else {    // if current space is used
        lastIdAddedToChecksum = i
        checksum += i * Number(blocks[i])
        i++
    }
}

// last ones (after all "." were removed)
for (i = lastIdAddedToChecksum + 1; i < blocks.length; i++)
    checksum += i * Number(blocks[i])

console.log(checksum)
console.timeEnd("Task1")