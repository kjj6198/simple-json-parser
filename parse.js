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
      throw SyntaxError('');
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

    throw new SyntaxError('fuck you');
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
        object[key] = number();
        skip();
        if (ch === '}') {
          next(',');
          return object;
        }
      }

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
      }
    }

    return parseInt(string, 10);
  }
  ch = text.charAt(0);
  let result = object();
  return result;
}

console.log(parse('{"123":1, "name": "kalan"}'));
