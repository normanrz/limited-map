# limited-map

Async map function with limited concurrency for JavaScript. This is a replacement for `Promise.all(items.map(asyncCallback))`. For example, this is useful if you have an API that you don't want to overload with your request flood. 

## Example

```javascript
const limitedMap = require("limited-map");

async function fetchDocs() {
  const docs = await limitedMap(urls, url => getJSON(url), 30);
  return docs;
}
```

## API

```javascript
limitedMap<T, U>(
  items: Array<T>, 
  callback: (item: T, index: number, array: Array<T>) => Promise<U>, 
  concurrency: number
): Promise<Array<U>>
```

## License
MIT
