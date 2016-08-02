const express = require('express')
const app = express()
const JSCrawler = require('./JSCrawler')

app.get('*', (req, res, next) => {
  new JSCrawler(req, res, next)
})

app.listen(3000, () => console.log('Lstening on port 3000!'))
