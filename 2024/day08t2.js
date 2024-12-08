const input = require("fs").readFileSync("./data.txt").toString().split("\r\n");

class Frequency {
    char = ""
    nodes = []
    antinodes = [] // UNIQUE
    maxL = input.length
    maxC = input[0].length

    hasNode(l, c) {
        this.nodes.filter(v => v[0] == l && v[1] == c).length != 0
    }
    add(l, c) {
        this.nodes.forEach(v => {
            const vectorL = Number(v[0]) - Number(l)
            const vectorC = Number(v[1]) - Number(c)

            this.addAntinode(v[0],v[1], vectorL, vectorC)
            this.addAntinode(l,c, -vectorL, -vectorC)
        })

        this.nodes.push([l, c])
    }
    addAntinode(originL, originC, vectorL, vectorC) {
        const nodeL = Number(originL) + Number(vectorL)
        const nodeC = Number(originC) + Number(vectorC)

        if (nodeL < 0 ||
            nodeL >= this.maxL ||
            nodeC < 0 ||
            nodeC >= this.maxC) return
        
        if (this.antinodes.filter(v => v[0] == nodeL && v[1] == nodeC).length == 0) {
            this.antinodes.push([nodeL, nodeC])
            this.addAntinode(nodeL, nodeC, vectorL, vectorC)
        }
    }
}

const frequencies = []

input.forEach((l, li) => {
    l.split('').forEach((c, ci) => {
        if (c != "." && c != "#") {
            let fIndex = getFrequencyIndex(c)
            if (fIndex == -1) {
                // create frequency
                const f = new Frequency()
                f.char = c
                fIndex = frequencies.push(f) - 1
            }
            frequencies[fIndex].add(li, ci)
            //onsole.log(frequencies[fIndex].char, li, ci, frequencies[fIndex].antinodes)
        }
    })
})
//console.log(frequencies)
const uniqueAntinodes = []
frequencies.forEach(f => {
    f.antinodes.forEach(n => {
        //console.log(n)
        if (uniqueAntinodes.filter(a => a[0] == n[0] && a[1] == n[1]).length == 0) uniqueAntinodes.push(n)
    })
    // + every antenna
    f.nodes.forEach(n => {
        if (uniqueAntinodes.filter(a => a[0] == n[0] && a[1] == n[1]).length == 0) uniqueAntinodes.push(n)
    })
})
console.log("Unique antinodes : ", uniqueAntinodes.length)

function getFrequencyIndex(char) {
    let foundI = -1
    frequencies.forEach((x, i) => {
        if (x.char == char) foundI = i
    })
    return foundI
}