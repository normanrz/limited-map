const assert = require("assert");
const limitedMap = require("./index");

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async function() {
  const concurrency = 2;

  const items = [];
  for (let i = 0; i < 30; i++) {
    items.push((i % 10) * 10);
  }

  let current = 0;
  await limitedMap(
    items,
    async item => {
      current++;
      await sleep(item);
      assert.ok(current <= concurrency);
      console.log(current);
      await sleep(item);
      current--;
    },
    concurrency
  );

  try {
    await limitedMap(
      items,
      async item => {
        throw new Error("test");
      },
      concurrency
    );
    assert.fail("Exception should be thrown.");
  } catch (e) {
    assert.ok(true);
  }

  console.log("Done");
})();
