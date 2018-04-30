function limitedMap(items, func, concurrency) {
  return new Promise((resolve, reject) => {
    const output = [];
    let i = 0;
    let completed = 0;
    let current = 0;
    let isAborted = false;

    function next() {
      if (isAborted) {
        return;
      }
      if (completed >= items.length) {
        resolve(output);
        return;
      }
      while (current < concurrency && i < items.length) {
        const _i = i;
        current++;
        func(items[_i], _i, items).then(
          value => {
            completed++;
            current--;
            output[_i] = value;
            next();
          },
          err => {
            reject(err);
            isAborted = true;
          }
        );
        i++;
      }
    }

    next();
  });
}

module.exports = limitedMap;
