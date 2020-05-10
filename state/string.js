const escape = {
  '"': '"',
  t: "\t",
  r: "\r",
  "\\": "\\",
};

function string(parser) {
  parser.next('"');
  parser.skip();

  if (parser.next('"')) {
    throw new Error("JSON key is empty string, fuck you.");
  }

  let str = "";
  let curr = "";

  while (((curr = parser.current()), curr)) {
    if (parser.next('"')) {
      return str;
    } else if (curr === "\\") {
      parser.index += 1;
      const escapeCh = parser.current();
      if (escape[escapeCh]) {
        str += escape[escapeCh];
      }
    } else {
      str += curr;
    }

    parser.index += 1;
  }
}

module.exports = string;
