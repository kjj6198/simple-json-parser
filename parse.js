const object = require("./state/object");

const escape = {
  '"': '"',
  t: "\t",
  r: "\r",
  "\\": "\\",
};

class Parser {
  constructor(raw) {
    this.raw = raw;
    // position
    this.index = 0;
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
