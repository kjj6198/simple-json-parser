const escape = {
  '"': '"',
  t: '\t',
  r: '\r',
  '\\': '\\',
};


function parse(text) {
  let ch = ' ';
  let position = 0;

  function next(c) {
    if (c && ch !== c) {
      throw SyntaxError(`expected current char was \`${c}\`, but got ${ch} at position ${position}`);
    }

    position += 1;
    ch = text.charAt(position);
    return ch;
  }

  function skip() {
    while (ch <= ' ') {
      position += 1;
      ch = text.charAt(position);
    }
  }

  function string() {
    let string = '';
    skip();

    if (ch === '"') {
      while (next()) {
        if (ch === '"') {
          next(); // manually next char.
          return string;
        } else if (ch === '\\') {
          next();
          if (escape[ch]) {
            string += escape[ch];
          }
        } else { string += ch; }
      }
    }

    throw new SyntaxError('Unexpected token while parsing string at position ' + position);
  }

  function object() {
    let key = '';
    const object = {};
    if (ch === '{') {
      next('{');
      skip();

      if (ch === '}') {
        next('}');
        return Object.create(null);
      }

      while (ch) {
        key = string();
        skip();
        next(':');
        object[key] = value();
        skip();
        if (ch === '}') {
          next('}');

          return object;
        }

        next(',');
        skip();
      }

    }

  }

  function array() {
    const array = [];
    if (ch === '[') {
      next('[');
      skip();

      if (ch === ']') { // terminate
        next(']');
        return array;
      }

      while(ch) {
        array.push(value());
        skip();
        console.log(ch);

        if (ch === ']') {
          next(']');
          return array;
        }
        next(',');
        skip();
      }
    }
  }

  function keyword() {
    const keywords = [
      'true',
      'false',
      'null',
    ];
    switch (ch) {
      case 't':
        keywords[0].split('').forEach(char => next(char));
        return true;
      case 'f':
        keywords[1].split('').forEach(char => next(char));
        return false;
      case 'n':
        keywords[2].split('').forEach(char => next(char));
        return null;
      default:
        throw new SyntaxError('unexpected token at position ' + position);
    }
  }

  function number() {
    let string = '';

    if (ch === '-') { string = '-'; }
    while (ch >= '0' && ch <= '9') {
      string += ch;
      next();
    }

    if (ch === '.') {
      string += '.';
      while (next() && ch >= '0' && ch <= '9') {
        string += ch;
        next();
      }
    }

    return parseInt(string, 10);
  }

  function value() {
    skip();
    switch(ch) {
      case '{':
        return object();
      case '"':
        return string();
      case '-':
        return number();
      case '[':
        console.log('array')
        return array();
      default:
        return ch >= '0' && ch <= '9' ? number() : keyword();
    }
  }

  ch = text.charAt(0);
  let result = value();
  return result;
}

console.log(parse('{"123": [1,   2, 3]}'));
