const input = require("fs").readFileSync("./data.txt").toString().split("\r\n");
let count = 0;

input.forEach((v, i) => {
  const finalValue = v.substring(0, v.indexOf(":"));
  const testValues = v.split(": ")[1].split(" ");
  const maxBinValue = Math.pow(2, testValues.length - 1) - 1;
  let binValue = "0".repeat(testValues.length - 1);
  let calibrated = false

  //console.log(finalValue, testValues)
  for (i = 0; i <= maxBinValue; i++) {
    const result = testValues.reduce((m, n, j) => {
      //console.log(m,n,j,binValue[j-1])
      //console.log(m,binValue[j-1] == 0 ? "+": "*",n)
      return binValue[j-1] == "0" ? Number(m) + Number(n) : Number(m) * Number(n);
    });
    if (result == finalValue) calibrated = true
    binValue = add1(binValue);
    //console.log("currcount", count)
  }

  if (calibrated) count += Number(finalValue)
});

console.log(count)

/**
 *
 * @param {string} val binary value to which we'll add 1
 * @returns {string} binary param + 1
 */
function add1(val) {
  let res = "";
  let add1Next = false;
  val
    .split("")
    .reverse()
    .forEach((x, i) => {
      if (i == 0) {
        if (x == 1) {
          res += 0;
          add1Next = true;
        } else res += 1;
      } else {
        if (add1Next) {
          add1Next = false;
          if (x == 1) {
            res += 0;
            add1Next = true;
          } else res += 1;
        } else res += x;
      }
    });
  return res.split("").reverse().join("");
}


// task 2 : base 3 instead of 2

/**
 *
 * @param {string} val binary value to which we'll add 1
 * @returns {string} binary param + 1
 */
function add1Base3(val) {
  let res = "";
  let add1Next = false;
  val
    .split("")
    .reverse()
    .forEach((x, i) => {
      if (i == 0) {
        if (x == 2) {
          res += 0;
          add1Next = true;
        } else res += Number(x) + 1;
      } else {
        if (add1Next) {
          add1Next = false;
          if (x == 2) {
            res += 0;
            add1Next = true;
          } else res += Number(x) + 1;
        } else res += x;
      }
      console.log(res)
    });
  return res.split("").reverse().join("");
}
