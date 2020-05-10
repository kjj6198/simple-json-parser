const string = require("./string");
const number = require("./number");
const keyword = require("./keyword");

function array(parser) {
  const arr = [];

  if (parser.current() === "[") {
    parser.next("[");
    parser.skip();

    if (parser.next("]")) {
      return arr;
    }
    let i = 0;
    while (parser.current()) {
      const val = value(parser);
      arr.push(val);

      parser.skip();

      if (parser.current() === "]") {
        parser.next("]");
        return arr;
      }
      parser.next(",");
      parser.skip();
    }
  }

  return arr;
}

function value(parser) {
  parser.skip();
  const ch = parser.current();

  switch (ch) {
    case "{":
      return object(parser);
    case '"':
      return string(parser);
    case "-":
      return number(parser);
    case "[":
      return array(parser);
    default:
      return ch >= "0" && ch <= "9" ? number(parser) : keyword(parser);
  }
}

function object(parser) {
  const obj = Object.create(null);
  let key = "";

  if (parser.current() === "{") {
    parser.next("{");
    parser.skip();

    if (parser.current() === "}") {
      parser.next("}");
      return obj;
    }

    while (parser.current()) {
      key = string(parser);

      parser.skip();
      parser.next(":");
      obj[key] = value(parser);
      parser.skip();
      if (parser.current() === "}") {
        parser.next("}");
        return obj;
      }
      parser.next(",");
      parser.skip();
    }
  }
}

module.exports = object;
