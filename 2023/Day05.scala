package challenges

import scala.io.Source._

object Day05 extends App {
  // SRC is not closed
  // unfinished
  val bsrc = fromFile("src/main/scala/challenges/Day05-inputEX.txt")
  var seeds = bsrc.getLines.next.split(" ").map(_.trim()).drop(1)
  println(seeds.mkString("Array(", ", ", ")"))
  bsrc.close()
  var currentNum = 0

  for (seed <- seeds) {
    val src = fromFile("src/main/scala/challenges/Day05-inputEX.txt")
    src.getLines.next
    src.getLines.next
    var end = false
    var locationFound = false

    while(!end) {
      val l = src.getLines.next
      /*if (l != "") {
        if ("""\D""".r matches l) if (l.contains("location")) locationFound = true
        else {
          if (locationFound)
        }
      }*/
      println(l)
    }
  }

  def findmap(map: Array[String], current: Int): Int = {
    // 50 98 2
    // 99 -> 51
    return 1
  }
}
