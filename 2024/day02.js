// https://adventofcode.com/2024/day/2

const input = require("fs").readFileSync("./data.txt").toString()
const reports = input.split('\r\n')
let safeCount = 0
reports.forEach((v,i) => {
    reports[i] = v.split(' ')
    safeCount += testReport(reports[i], false) ? 1 : 0
})
console.log(safeCount)

function testReport(report, recursed) {
    let last = -1
    let addition = true
    let errors = 0

    report.forEach((r,i) => {
        if (last == -1) last = r
        else {
            if (i == 1 && last - r < 0) addition = false
            let diff = addition ? last - r : r - last
            if (diff != 1 && diff != 2 && diff != 3) errors++;
        }
        last = r
    })

    if (errors == 0) return true
    else if (recursed) return false
    else {
        let ok = false
        report.forEach((r,i) =>{
            let arr = Array.from(report)
            arr.splice(i,1)
            if (testReport(arr,true)) ok = true
        })
        return ok
    }
}