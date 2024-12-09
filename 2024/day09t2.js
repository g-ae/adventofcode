const input = require("fs").readFileSync("./data.txt").toString();
let blocks = []
let currI = 0

class DiskSpace {
    type = ""   // used, free
    size = -1
    fileId = -1

    /**
     * 
     * @param {Array[DiskSpace]} arr array to check
     * @param {Number} n num of free spaces
     * @returns {Number} index or -1 if not found
     */
    static firstIdWithNFreeSpaces(arr, n) {
        let id = -1
        arr.forEach((x, i) => {
            //if (x.type == "free") console.log(x.type,x.size, n, x.size == Number(n), x.type == "free",id,i, id == -1)
            if (x.size >= Number(n) && x.type == "free") if (id == -1) id = i

        })
        //console.log("returned",id)
        return id
    }

    static toString(arr) {
        let str = ""
        arr.forEach(x => {
            if (x.type == "used") str += x.fileId.toString().repeat(x.size)
            else str += ".".repeat(x.size)
        })
        return str
    }
}

console.time("Task2")

// add data to array
input.split('').forEach((n, i) => {
    if (i % 2 != 0) {
        const ds = new DiskSpace()
        ds.type = "free"
        ds.size = Number(n)
        blocks.push(ds)
    } else {
        const ds = new DiskSpace()
        ds.type = "used"
        ds.size = Number(n)
        ds.fileId = currI++
        blocks.push(ds)
    }
})

// for refactor + checksum calc
let checksum = 0
let alreadyDone = []

// every element of data
for (i = blocks.length - 1; i >= 0; i--) {
    if (blocks[i].type == "used") {
        const firstFreeSpaceId = DiskSpace.firstIdWithNFreeSpaces(blocks, blocks[i].size)
        // firstFreeSpace found, hasn't been done already, firstReadyId < than current Id
        if (firstFreeSpaceId != -1 && !alreadyDone.includes(blocks[i].fileId) && i > firstFreeSpaceId) {
            const originalSize = blocks[i].size

            if (blocks[firstFreeSpaceId].size != originalSize) {
                const remainingEmptyDS = new DiskSpace()
                remainingEmptyDS.type = "free"
                remainingEmptyDS.fileId = i
                remainingEmptyDS.size = blocks[firstFreeSpaceId].size - originalSize

                // set used to first part of free
                blocks[firstFreeSpaceId] = blocks[i]

                // add missing free parts
                blocks = [
                    ...blocks.slice(0, firstFreeSpaceId + 1),
                    remainingEmptyDS,
                    ...blocks.slice(firstFreeSpaceId + 1)
                ]

                // set old id to free
                i += 1
            } else {
                blocks[firstFreeSpaceId] = blocks[i]
            }

            const emptyDS = new DiskSpace()
            emptyDS.type = "free"
            emptyDS.size = originalSize
            blocks[i] = emptyDS

            alreadyDone.push(blocks[firstFreeSpaceId].fileId)
            i = blocks.length - 1
        }
    }
}

//console.log(DiskSpace.toString(blocks))

// calculate checksum
let diskId = 0  // If blocks was a string, this would be its id

// for every item in blocks
for (arrId = 0; arrId < blocks.length; arrId++) {
    const curr = blocks[arrId]
    if (curr.type == "used") {
        for (i = 0; i < curr.size; i++) {
            // diskId is currently the id of the first "DiskSpace" element
            checksum += (diskId + i) * curr.fileId
        }
        // diskId becomes the id for the first element of the next block
        diskId += curr.size
    }
    // if current block is free (".") diskId become the id of the next element
    else diskId += curr.size
}

console.log("Checksum :", checksum)
console.timeEnd("Task2")
// ~33s execution time for AoC data