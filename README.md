# JSCrawler
The best way to share JS apps content on Facebook!

## Why?

When you put url on your Facebook, it'll load the content based on `og:` meta tags, so, if you're using JavaScript apps, won't wait your page load and will get wrong data. This module will load your page first, if accessed by Facebook, and will return the correct informations to share.

## Setup

Just type:
`npm i --save jscrawler`

## Dependencies

This is a **Express Framework** module.

## Usage

```js
import JSCrawler from 'jscrawler'

app.get('*', (req, res, next) => {
  new JSCrawler(req, res, next)
})
```
