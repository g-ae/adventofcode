package challenges

object Day08 extends App{
  val bsrc = scala.io.Source.fromFile("src/main/scala/challenges/Day08-input.txt")
  val instructions = bsrc.getLines().next
  var ci = 0 // current instruction
  val src = bsrc.mkString.split("\r\n").drop(1).mkString("\n")
  bsrc.close()
  var steps = 0

  var ended = false
  var currentLine = src.split('\n')(0).dropRight(1)

  while(!ended) {
    steps += 1
    val choice = """([a-zA-Z]{3},.[a-zA-Z]{3})""".r.findAllMatchIn(currentLine).mkString.replaceAll("""\s""", "").split(',')
    val sfound = s"(\\A|\\r|\\n|\\r\\n)${if instructions(ci) == 'L' then choice(0) else choice(1)}.*".r.findAllMatchIn(src).mkString
    if ("""(\A|\r|\n|\r\n)ZZZ.*""".r matches sfound) ended = true
    else currentLine = sfound
    ci = if instructions.length - 1 == ci then 0 else ci + 1

    println(s"$steps : $currentLine")
  }
  println(s"Task 1 steps : $steps")
}