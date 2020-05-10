const object = require("./state/object");

const escape = {
  '"': '"',
  t: "\t",
  r: "\r",
  "\\": "\\",
};

class Parser {
  constructor(raw, variables) {
    this.raw = raw;
    // position
    this.loc = {
      col: 0,
      row: 0,
    };
    this.index = 0;
    this.variables = variables;
  }

  remaining() {
    return this.raw.slice(this.index);
  }

  current() {
    return this.raw[this.index];
  }

  // match given str
  next(str) {
    if (this.raw.slice(this.index, this.index + str.length) === str) {
      this.index += str.length;
      return true;
    }

    return false;
  }

  skip() {
    while (this.raw[this.index] <= " ") {
      if (this.raw[this.index] === "\n") {
        this.loc.col += 1;
        this.loc.row = 0;
      }

      this.loc.row += 1;
      this.index += 1;
    }
  }

  read(pattern) {
    const match = pattern.exec(this.raw.slice(this.index));
    if (!match || match.index !== 0) {
      return null;
    }
  }

  parse() {
    const value = object(this);
    return value;
  }
}

module.exports = Parser;

new Parser(`{"people": ["Kalan", "denny", "hook"]}`).parse();
