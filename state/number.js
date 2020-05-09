function number(parser) {
  let str = "";
  if (parser.current() === "-") {
    str += "-";
    parser.index += 1;
  }

  let curr = "";
  while (((curr = parser.current()), curr >= "0" && curr <= "9")) {
    str += curr;
    parser.index += 1;
  }

  let isFloat = false;
  // float number
  if (parser.next(".")) {
    str += ".";
    isFloat = true;
    while (((curr = parser.current()), curr >= "0" && curr <= "9")) {
      str += curr;
      parser.index += 1;
    }
  }

  // exponential expression
  let expo = "";
  if (parser.next("e")) {
    curr = "";
    if (parser.next("-")) {
      expo += "-";
    }

    while (((curr = parser.current()), curr >= "0" && curr <= "9")) {
      expo += curr;
      parser.index += 1;
    }
  }

  if (expo) {
    return isFloat
      ? parseFloat(str, 10) * Math.pow(10, +expo)
      : parseInt(str, 10) * Math.pow(10, +expo);
  }

  return isFloat ? parseFloat(str, 10) : parseInt(str, 10);
}

module.exports = number;
