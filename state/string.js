function string(parser) {
  parser.next('"');

  if (parser.next('"')) {
    throw new Error("JSON key is empty string, fuck you.");
  }
  let key = "";
  let curr = "";
  while (((curr = parser.current()), curr)) {
    if (parser.next('"')) {
      parser.index += 1;
      return key;
    }
    key += curr;
    parser.index += 1;
  }
}

module.exports = string;
