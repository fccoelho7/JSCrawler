const phantom = require('phantom')
const himalaya = require('himalaya')
const cheerio = require('cheerio')

module.exports = class JSCrawler {
  constructor(req, res, next) {
    this.res = res
    this.req = req

    if (!this.isCrawler()) {
      return next()
    }

    this.loadPage()
  }

  readPage(html) {
    let $ = cheerio.load(html)
    const options = ['title', 'description', 'image']
    const metas = {}

    options.map((meta) => {
      const content = $(`meta[property="og:${meta}"]`).attr('content')
      metas[meta] = content
    })

    this.renderDOM(metas)
  }

  renderDOM(metas) {
    const headers = this.generateMetaTags(metas)
    const html = `<html><head>${headers}</head></html>`
    this.res.send(html)
  }

  generateMetaTags(metas) {
    let html = ''
    for (let item in metas) {
      if (!metas.hasOwnProperty(item)) return
      html += `<meta property='og:${item}' content='${metas[item]}' />`
    }
    return html
  }

  loadPage() {
    const url = this.req.protocol + '://' + this.req.get('host') + this.req.originalUrl
    let sitepage = null
    let phInstance = null

    phantom.create()
      .then(instance => {
        phInstance = instance
        return instance.createPage()
      })
      .then(page => {
        sitepage = page
        return page.open(url)
      })
      .then(status => {
        return sitepage.property('content')
      })
      .then(content => {
        this.readPage(content)
        sitepage.close()
        phInstance.exit()
      })
      .catch(error => {
        phInstance.exit()
      })
  }

  isCrawler() {
    const user = this.req.headers['user-agent']
    if (!(user.match(/facebookexternalhit|Facebot/i))) {
      return false
    }
    return true
  }
}
