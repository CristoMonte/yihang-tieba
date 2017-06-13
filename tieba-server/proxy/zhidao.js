// 代理百度知道的功能

const utils = require('./utils')
const cheerio = require('cheerio')
const iconv = require('iconv-lite')

// http://suggest.wenda.so.com/index.php ? cb=searchDataCallback & biz=wenda & word=%E6%96%B9%E6%B3%95 & fmt=json
let url_su = 'http://suggest.wenda.so.com/index.php'  // 用户输入时 动态获取信息的url
// http://wenda.so.com/search ? q=易杭
let url_zd = 'https://zhidao.baidu.com/search'  // 用户提交时 获取信息的url

module.exports = async (router) => {
  // 用户动态输入后 获取到提示信息
  // localhost:8889/proxy/su?wd=xxxx GET
  router.get('/su', async (ctx) => {
    let query = `?cb=searchDataCallback&biz=wenda&word=${ctx.query.wd}&fmt=json`
    let url = url_su + query
    let result = await utils.get(url, 'http')
    ctx.body = result
  })
  // 用户按下确认键的时候 可以获取信息
  // localhost:8889/proxy/zd?wd=xxxx GET
  router.get('/zd', async (ctx) => {
    let query = `?lm=0&rn=10&pn=0&fr=search&ie=gbk&word=${ctx.query.wd}`
    let url = url_zd + query
    let result = await utils.get(url, 'https', function (data) {
      return iconv.decode(Buffer(data), 'gb2312')
    })
    let $ = cheerio.load(result, {decodeEntities: false})
    result = []
    $('#wgt-list > dl').each(function(i, elem) {
      result[i] = $(elem).html()
    })
    ctx.body = result
  })
}
