# JSCrawler
The best way to share JS apps content on Facebook!

## Usage

```js
app.get('*', (req, res, next) => {
  new JSCrawler(req, res, next)
})
```
