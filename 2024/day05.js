const input = require("fs").readFileSync("./ex.txt").toString()
const lines = input.split("\r\n")
const breakId = lines.indexOf("")

// Task 1
const rules = []
const updates = []
const verifiedUpdates = [] // correct ones only

const wrongUpdates = []  // Task 2

for(i = 0; i < breakId; i++) rules.push(lines[i])
for(i = breakId+1; i < lines.length; i++) updates.push(lines[i])

updates.forEach((update,i) => {
    console.log(update)
    const nums = update.split(',')
    let right = true
    rules.forEach((rule,j) => {
        if (!checkUpdateWithRule(nums, rule)) {
            right = false 
        }
    })
    if (right) verifiedUpdates.push(update)
    else wrongUpdates.push(correct(nums))
})
const middleNumbers = []

verifiedUpdates.forEach((update,i) => {
    const splitted = update.split(',')
    middleNumbers.push(Number(splitted[(splitted.length - 1) / 2]))
})
console.log(middleNumbers.reduce((m,n) => m + n))

function checkUpdateWithRule(update, rule) {
    const n1 = rule.split('|')[0]
    const n2 = rule.split('|')[1]
    const ion1 = update.indexOf(n1)
    const ion2 = update.indexOf(n2)
    let right = true

    if (ion1 != -1 && ion2 != -1 && update.indexOf(n1) >= update.indexOf(n2)) {
        right = false
        console.log(n1,n2, update.indexOf(n1), update.indexOf(n2), right)
    }
    return right
}

// Task 2

console.log(wrongUpdates)


/**
 * Task 2 : Change the update so that it is valid
 * @param {*} update Update array
 * @param {*} rule 
 */
function correct(update) {
    let final = Array.from(update)

   // lines[i].split(';')[4]
    
    rules.forEach((r,i) => {
        const n1 = r.split('|')[0]
        const n2 = r.split('|')[1]
        const ion1 = update.indexOf(n1)
        const ion2 = update.indexOf(n2)

        if (ion1 > ion2) {
            const newIdOf1 = ion2 - 1
            let t = Array.from(final)
            let last = ""
            final.forEach((v,j) => {
                if (j == newIdOf1) {
                    last = t[j]
                    t[j] = final[ion1]
                } else if (last != "") {
                    let inbetween = t[j]
                    t[j] = last
                    last = inbetween
                }
            })
            final = t
        }
    })
    return final
}