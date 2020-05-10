## simple-json-parser ![JSON parse](https://github.com/kjj6198/simple-json-parser/workflows/JSON%20parse/badge.svg?branch=master)

Simple recursive descent JSON parser.

## How to Run

- `npm install`
- `npm test` for testing
- in `parse.js` it exposes a function called parse. You can use it to parse JSON value.

## JSON features

- [x] number
  - [x] negative
  - [x] float
  - [x] exponential (e.g: 1e6, 1.2e10)
- [x] string
- [x] nested object
- [x] empty key warning
- [x] primitive: `null`, `true`, `false`
- [x] trim white space
- [x] array
- [x] special string (\u)

## Custom feature

- [ ] prefix `@`
- [ ] builtin formatter
- [x] template `$name$`
