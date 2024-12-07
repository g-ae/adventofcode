package challenges

object Day04 extends App {
  var sin: String = ""
  var pointTotal: Int = 0
  for (line <- sin.split('\n')) {
    val t = line.split(':')(1).split('|')
    val winning = t(0).replaceAll(" {2}", " 0").split(' ').drop(1).map(_.trim()) // replaceAll("  7" --> " 07")
    val owned = t(1).replaceAll(" {2}", " 0").split(' ').drop(1).map(_.trim())
    var matching = 0
    for (n <- owned) if (winning.contains(n)) matching += 1
    var lineTotal = if matching > 0 then 1 else 0

    if (matching >= 2) lineTotal = lineTotal * Math.pow(2, matching - 1).toInt
    pointTotal += lineTotal
  }
  println("Total task 1 : " + pointTotal)

  // TASK 2
  // initializes an array of the size of the number of cards and fills it with "1"
  var totalCards: Array[Int] = Array.fill(sin.split('\n').length) {1}

  var currentCard = 0 // INDEX
  for (line <- sin.split('\n')) {
    val t = line.split(':')(1).split('|')
    val winning = t(0).replaceAll(" {2}", " 0").split(' ').drop(1).map(_.trim()) // replaceAll("  7" --> " 07")
    val owned = t(1).replaceAll(" {2}", " 0").split(' ').drop(1).map(_.trim())
    var matching = 0

    // Check matching numbers
    for (n <- owned) if (winning.contains(n)) matching += 1

    var ended = false
    var i = 0

    if (matching >= 1)
      while (!ended) {
        i += 1
        totalCards(currentCard + i) += (1 * totalCards(currentCard))
        if (matching == i) ended = true
      }
    currentCard += 1
  }
  var totalt2 = 0
  for (card <- totalCards) totalt2 += card
  println(s"Total task 2 : $totalt2")
}
