package challenges

import scala.io.Source._

object Day06 extends App {
  val bsrc = scala.io.Source.fromFile("src/main/scala/challenges/Day06-input.txt")
  val src = bsrc.mkString
  bsrc.close()
  val time = src.split('\n')(0).replaceAll("""\s+""", " ").split(" ").drop(1)
  val arrdistance = src.split('\n')(1).replaceAll("""\s+""", " ").split(" ").drop(1)
  var winning = 1

  var winforcurrenttime = 0
  var currentTimeIndex = 0
  for (t <- time) {

    if(t == "") println("AAAAA")
    winforcurrenttime = 0

    var i = 0
    while (i < t.toInt) {
      // Appuyer pendant i ms, laisser partir pendant (t - i) ms à une vitesse de i/ms -> distance = i * (t-i)
      if (i * (t.toInt - i) > arrdistance(currentTimeIndex).toInt) winforcurrenttime += 1
      i+=1
    }
    currentTimeIndex += 1
    //println(s"Curr win : $winning , * $winforcurrenttime")
    winning *= winforcurrenttime
  }
  println(s"Task 1 result: $winning")

  // TASK 2
  val t2time = time.mkString("").toLong
  val t2distance = arrdistance.mkString("").toLong
  println(s"TIME: $t2time, DISTANCE: $t2distance")
  // executed once

  var wins: Long = 0

  var i: Long = 0
  while (i < t2time) {
    // Appuyer pendant i ms, laisser partir pendant (t - i) ms à une vitesse de i/ms -> distance = i * (t-i)
    if (i * (t2time - i) > t2distance) wins += 1
    i += 1
  }

  println(s"Task 2 result: $wins")
}
