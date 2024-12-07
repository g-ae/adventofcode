// https://adventofcode.com/2024/day/1

// Task 1

const input = require("fs").readFileSync("./data.txt").toString()
const lines = input.split('\r\n')
const col1 = []
const col2 = []
const distances = []
lines.forEach(l => {
    col1.push(l.split("   ")[0])
    col2.push(l.split("   ")[1])
})
col1.sort()
col2.sort()

col1.forEach((v,i) => {
    distances.push(Math.abs(col1[i] - col2[i]))
})

console.log("Sum : " + distances.reduce((n, c) => n + c))

// Task 2

let similarityScore = 0
col1.forEach(v=> {
    let n = 0
    col2.forEach(v2 => {
        if (v == v2) n++
    })
    similarityScore += v * n
})

console.log("Similarity score : " + similarityScore)