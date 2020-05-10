const assert = require("assert");
const fs = require("fs");
const Parser = require("./parse");

describe("JSON parser", () => {
  const dirs = fs.readdirSync("test");
  dirs.forEach((dir) => {
    if (dir === ".") {
      return;
    }

    const sample = fs.readFileSync(`test/${dir}/sample.json`);

    if (fs.existsSync(`test/${dir}/config.json`)) {
      it(dir, () => {
        const config = JSON.parse(
          fs
            .readFileSync(`test/${dir}/config.json`, { encoding: "utf8" })
            .toString()
        );
        assert.throws(() => {
          const actual = new Parser(sample.toString()).parse();
        }, config.message);
      });
    } else {
      const expected = fs
        .readFileSync(`test/${dir}/expect.json`, {
          encoding: "utf8",
        })
        .toString();
      if (dir.includes("template")) {
        const variables = JSON.parse(
          fs
            .readFileSync(`test/${dir}/variables.json`, {
              encoding: "utf8",
            })
            .toString()
        );

        const actual = new Parser(sample.toString(), variables).parse();

        it(dir, () => {
          assert.deepEqual(actual, JSON.parse(expected));
        });
      } else {
        const actual = new Parser(sample.toString()).parse();
        it(dir, () => {
          assert.deepEqual(actual, JSON.parse(expected));
        });
      }
    }
  });
});
