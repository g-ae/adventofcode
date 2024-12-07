const input = require("fs").readFileSync("./data.txt").toString()

// Task 1
let sum = 0
input.match(/mul\([0-9]{1,3},[0-9]{1,3}\)/gmi).forEach(v => {
    sum += v.match(/[0-9]{1,3}/gi).reduce((m,n) => Number(m) * Number(n))
})
console.log(sum)

// Task 2
let doing = true
let sum2 = 0
input.match(/mul\([0-9]{1,3},[0-9]{1,3}\)|do\(\)|don\'t\(\)/gim).forEach(v => {
    if (v.includes('do')) {
        if (v == "do()") doing = true
        else if (v == "don't()") doing = false
    } else if (doing) {
        sum2 += v.match(/[0-9]{1,3}/gi).reduce((m,n) => Number(m) * Number(n))
    }
})
console.log(sum2)