package challenges

object Day02 extends App {
  val input = ""
  val maxRed = 12
  val maxGreen = 13
  val maxBlue = 14
  val sred = "red"
  val sblue = "blue"
  val sgreen = "green"
  var possibleTotal = 0

  for (game <- input.split('\n')) {
    val num = game.split(':')(0).split(' ')(1).toInt
    val sets = game.split(':')(1).split(';')
    var possible = true
    for (set <- sets) {
      for (cube <- set.split(',')) {
        // get number
        val nc ="""\d""".r.findAllMatchIn(cube).map(_.toString.trim()).toArray.mkString("").toInt
        if (nc > 12) {
          val color = """[a-zA-Z]""".r.findAllMatchIn(cube).map(_.toString.trim()).toArray.mkString("")
          if (color == sred && nc > maxRed) possible = false
          else if (color == sgreen && nc > maxGreen) possible = false
          else if (color == sblue && nc > maxBlue) possible = false
        }
      }
    }
    if (possible) possibleTotal += num
  }
  println("Task1 : " + possibleTotal)

  var totalpower = 0

  for (game <- input.split('\n')) {
    val num = game.split(':')(0).split(' ')(1).toInt
    val sets = game.split(':')(1).split(';')
    var topred = 0
    var topgreen = 0
    var topblue = 0
    for (set <- sets) {
      for (cube <- set.split(',')) {
        // get number
        val nc = """\d""".r.findAllMatchIn(cube).map(_.toString.trim()).toArray.mkString("").toInt
        if (nc > topred || nc > topgreen || nc > topblue) {
          val color = """[a-zA-Z]""".r.findAllMatchIn(cube).map(_.toString.trim()).toArray.mkString("")
          if (color == sred && nc > topred) topred = nc
          else if (color == sgreen && nc > topgreen) topgreen = nc
          else if (color == sblue && nc > topblue) topblue = nc
        }
      }
    }
    totalpower += topred * topgreen * topblue
  }
  println("Task2 : " + totalpower)
}
