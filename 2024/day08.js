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
            // distance
            // vL = v[0]
            // vC = v[1]

            //console.log(v, l, c)

            const vectorL = Number(v[0]) - Number(l)
            const vectorC = Number(v[1]) - Number(c)

            const node1L = Number(v[0]) + Number(vectorL)
            const node1C = Number(v[1]) + Number(vectorC)

            // console.log(node1L, node1C)
            if (this.antinodes.filter(v => v[0] == node1L && v[1] == node1C).length == 0 &&
                node1L >= 0 &&
                node1L < this.maxL &&
                node1C >= 0 &&
                node1C < this.maxC
            ) {
                this.antinodes.push([node1L, node1C])
            }

            const node2L = l - vectorL
            const node2C = c - vectorC

            if (this.antinodes.filter(v => v[0] == node2L && v[1] == node2C).length == 0 &&
                node2L >= 0 &&
                node2L < this.maxL &&
                node2C >= 0 &&
                node2C < this.maxC
            ) {
                this.antinodes.push([node2L, node2C])
            }
        })

        this.nodes.push([l, c])
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
})
console.log("Unique antinodes : ", uniqueAntinodes.length)

function getFrequencyIndex(char) {
    let foundI = -1
    frequencies.forEach((x, i) => {
        if (x.char == char) foundI = i
    })
    return foundI
}