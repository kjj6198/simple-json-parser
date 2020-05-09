const string = require("./string");
const number = require("./number");
const keyword = require("./keyword");

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
    // console.log("array");
    // return array();
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
      obj[key] = string(parser);
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
