const jsdom = require('jsdom')
const request = require('request-promise')
const { JSDOM } = jsdom

const getDom = (html, url) => new JSDOM(html, {
  url,
  contentType: 'text/html',
  userAgent: 'Mellblomenator/9000',
  includeNodeLocations: true,
  runScripts: 'dangerously',
  resources: 'usable',
})

module.exports = ({
  url, selector, maxRetry = 10, retryInterval = 1000,
}) => {
  return new Promise(async (resolve, reject) => {
    const html = await request.get(url).catch(e => reject(e))
    const { window } = getDom(html, url)
    const { document } = window
    let times = 0
    const si = setInterval(() => {
      times += 1
      const el = document.querySelectorAll(selector)
      if (el.length) {
        resolve(el)
      }
      if (times >= maxRetry && !el.length) {
        clearInterval(si)
        reject()
      }
    }, retryInterval)
  })
}

