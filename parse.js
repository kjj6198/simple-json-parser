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
      throw SyntaxError(`expected current char was \`${c}\`, but got ${ch}`);
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
      default:
        return ch >= '0' && ch <= '9' ? number() : null;
    }
  }

  ch = text.charAt(0);
  let result = value();
  return result;
}

console.log(parse('{"123":1, "name": "kalan"}'));
