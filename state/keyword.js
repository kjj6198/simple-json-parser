// true, false, null

function keyword(parser) {
  if (parser.next("true")) {
    return true;
  } else if (parser.next("false")) {
    return false;
  } else if (parser.next("null")) {
    return null;
  }
}

module.exports = keyword;
