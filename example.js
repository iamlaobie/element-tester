const test = require('./index')
test({ url: 'https://www.baidu.com/', selecotr: '#kw' }).then((els) => {
  // You can test deeply by els
  console.log('The page loaded was OK')
  console.log('Specified selector els is ', els)
  process.exit()
}).catch((e) => {
  console.log(e)
  console.log('The page load failure or page content NOT has the specified selector els')
  process.exit()
})
