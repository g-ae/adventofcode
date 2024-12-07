package challenges

import scala.collection.mutable.ArrayBuffer
import scala.util.matching.Regex

object Day03 extends App {
  var sin = ""
  var a: String = "" // check unique chars

  // SETUP FOR BOTH TASKS
  val symbols: Regex = """[*/=+%@#&\-$]""".r // etc
  val digits: Regex = """\d""".r
  var maxlin = sin.split('\n').length
  var maxcol = sin.split('\n')(0).length
  var in: Array[Array[String]] = Array.ofDim[String](maxlin, maxcol)
  var cline = 0
  var ccolumn = 0

  var gearLocations = ArrayBuffer[String]()

  for (l <- sin.split('\n')) {
    val li = l.replaceAll("\n", "")
    // Chaque ligne
    ccolumn = 0
    for (c <- l) {
      // Chaque char
      if (c.toString != "") {
        in(cline)(ccolumn) = c.toString
        // if is gear, save location
        if (c.toString == "*") gearLocations += cline + "," + ccolumn

        ccolumn += 1
      }
    }
    cline += 1
  }

  // TASK 1
  var skip: Boolean = false
  var totalsum = 0
  for (lin <- 0 until maxlin) {
    for (col <- 0 until maxcol) {
      //println(lin + " " + col)
      if ("""\d""".r matches in(lin)(col)) {
        if (!skip) {
          // Found first digit of number
          var found: Boolean = false
          var i: Int = col
          var n: String = ""
          val colfirst: Int = col
          var collast: Int = -1
          while (!found) {
            if ("""\d""".r matches in(lin)(i)) {
              n += in(lin)(i)
              i += 1
            } else {
              skip = true
              found = true
              collast = i - 1
            }
          }

          if (isPartNumber(lin, colfirst, collast)) {
            println("Added to totalsum : " + n)
            totalsum += n.toInt
          }
        }
      } else skip = false
    }
  }
  println("totalsum : " + totalsum)

  private def isPartNumber(line: Int, colfirst: Int, collast: Int): Boolean = {
    println("trying line " + line + ", from " + colfirst + " to " + collast)
    // Diagonals
    //left
    if (colfirst != 0) {
      // topleft
      if (line != 0) if (symbols matches in(line - 1)(colfirst - 1)) return true
      // left
      if (symbols matches in(line)(colfirst - 1)) return true
      // bot left
      if (line < maxlin - 1) if (symbols matches in(line + 1)(colfirst - 1)) return true
    }
    // right
    if (collast < maxcol - 1) {
      // topright
      if (line != 0) if (symbols matches in(line - 1)(collast + 1)) return true
      // right
      if (symbols matches in(line)(collast + 1)) return true
      // bot right
      if (line < maxlin - 1) if (symbols matches in(line + 1)(collast + 1)) return true
    }

    val columns = collast - colfirst
    var r = false
    for (i <- 0 to columns) {
      // top
      if (line != 0) if (symbols matches in(line - 1)(colfirst + i)) r = true
      // bot
      if (line < maxlin - 1) if (symbols matches in(line + 1)(colfirst + i)) r = true
    }

    return r
  }

  // TASK 2
  println("Task 2")
  var gearTotal = 0
  for (gear <- gearLocations) {
    val locs = gear.split(',')
    gearTotal += getGearRatio(locs(0).toInt, locs(1).toInt)
  }
  println("_________________________")
  println("Task 2 total  : " + gearTotal.toString)

  private def getGearRatio(gearLin: Int, gearCol: Int): Int = {
    var gears = ArrayBuffer[String]()

    println("Checking gear F: Line " + gearLin + ", Column " + gearCol)

    // skips
    var topmid = true
    var topright = true
    var botmid = true
    var botright = true

    // top
    if (gearLin != 0) {
      // topleft
      if (gearCol != 0)
        if (digits matches in(gearLin - 1)(gearCol - 1)) {
          gears += findWholeNumber(gearLin - 1, gearCol - 1).toString
          if (digits matches in(gearLin - 1)(gearCol)) {
            topmid = false
            if (digits matches in(gearLin - 1)(gearCol + 1)) topright = false
          }
        }
      //top mid
      if (topmid) if (digits matches in(gearLin - 1)(gearCol)) {
        gears += findWholeNumber(gearLin - 1, gearCol).toString
        if (digits matches in(gearLin - 1)(gearCol + 1)) topright = false
      }

      // topright
      if (topright && gearCol != maxcol - 1) if (digits matches in(gearLin - 1)(gearCol + 1)) gears += findWholeNumber(gearLin - 1, gearCol + 1).toString
    }

    // bot
    if (gearLin != maxlin - 1) {
      // botleft
      if (gearCol != 0)
        if (digits matches in(gearLin + 1)(gearCol - 1)) {
          gears += findWholeNumber(gearLin + 1, gearCol - 1).toString
          if (digits matches in(gearLin + 1)(gearCol)) {
            botmid = false
            if (digits matches in(gearLin + 1)(gearCol + 1)) botright = false
          }
        }
      //botmid
      if (botmid) if (digits matches in(gearLin + 1)(gearCol)) {
        gears += findWholeNumber(gearLin + 1, gearCol).toString
        if (digits matches in(gearLin + 1)(gearCol + 1)) botright = false
      }
      // botright
      if (botright && gearCol < maxcol) if (digits matches in(gearLin + 1)(gearCol + 1)) gears += findWholeNumber(gearLin + 1, gearCol + 1).toString
    }
    // left
    if (gearCol != 0) if (digits matches in(gearLin)(gearCol - 1)) gears += findWholeNumber(gearLin, gearCol - 1).toString

    // right
    if (gearCol < maxcol) if (digits matches in(gearLin)(gearCol + 1)) gears += findWholeNumber(gearLin, gearCol + 1).toString

    // Only two gears allowedc
    var tot = 1
    if (gears.length == 2) {
      for (gear <- gears) {
        tot *= gear.toInt
      }
    }
    else return 0

    println("Gear ratio is : " + tot.toString)
    return tot
  }

  /**
   * Finds the whole number from the one of the found digits.
   * Searches the furthest digit on the left, then counts right.
   *
   * @param foundNumLin line of found number
   * @param foundNumCol column of the digit that was found
   * @return whole number int
   */
  private def findWholeNumber(foundNumLin: Int, foundNumCol: Int): Int = {
    var found = false
    var i = 1
    var n = ""
    var firstCol = -1

    // Search first digit
    while (!found) {
      if (foundNumCol - i >= 0) {
        if (digits matches in(foundNumLin)(foundNumCol - i)) {
          i += 1
        } else {
          found = true
          firstCol = foundNumCol - i + 1
        }
      } else {
        found = true
        firstCol = foundNumCol - i + 1
      }
    }

    // Search whole number
    found = false
    i = 0
    while (!found) {
      if (firstCol + i <= maxcol) {
        if (digits matches in(foundNumLin)(firstCol + i)) {
          n += in(foundNumLin)(firstCol + i)
          i += 1
        } else {
          found = true
        }
      } else {
        found = true
      }
    }
    return n.toInt
  }
}