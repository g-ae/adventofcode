package challenges

import scala.util.control.Breaks.break // introduit le mot-clé break

object Day01 extends App {
  val regex = """[0-9]|one|two|three|four|five|six|seven|eight|nine""".r
  val input: String = ""
  val splitted = input.split('\n')
  var tot: Int = 0

  for (line <- splitted) {
    // Variables pour chaque ligne
    var first: Int = -1
    var last: Int = -1
    var temp: String = ""

    println(line)
    val nl = line.replaceAll("one", "o1e").replaceAll("two", "t2o").replaceAll("three", "t3e").replaceAll("four", "f4r").replaceAll("five", "f5e").replaceAll("six", "s6x").replaceAll("seven", "s7n").replaceAll("eight", "e8t").replaceAll("nine", "n9e")
    // Recherche de regex (pour chaque objet trouvé dans le regex
    for (c <- regex.findAllMatchIn(nl).map(_.toString.trim).toArray) {
      var num: Int = -1
      println(s"tried $c")

      if ("""one|two|three|four|five|six|seven|eight|nine""".r matches c) {
        println(s"got $c")
        c match {
          case "one" => num = 1
          case "two" => num = 2
          case "three" => num = 3
          case "four" => num = 4
          case "five" => num = 5
          case "six" => num = 6
          case "seven" => num = 7
          case "eight" => num = 8
          case "nine" => num = 9
        }
      } else num = c.toInt

      if (first == -1) first = num
      last = num
    }
    println(s"$first$last")

    temp = s"$first$last"
    tot += temp.toInt
  }

  println(s"The result is $tot")
}
