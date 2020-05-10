function template(parser) {
  parser.skip();
  if (parser.next("$")) {
    parser.skip();

    if (parser.next("$")) {
      throw new Error("template can not be empty");
    }
    let curr = "";
    let key = "";
    while (((curr = parser.current()), curr)) {
      if (parser.next("$")) {
        return parser.variables[key];
      }
      key += curr;
      parser.index += 1;
    }
  }
}

module.exports = template;
