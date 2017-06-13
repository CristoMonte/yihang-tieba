const https = require('https')
const http = require('http')

// 拼接url
exports.urlSplice = function (url, query) {
  if (!query) return url
  if (typeof query === 'string') return url+'?'+query
  if ((typeof query === 'object') && (!query instanceof Array)) {
    let str = []
    query.keys(key => {
      str.push(key + '=' + query[key])
    })
    url = url+'?'+str.join('&')
    return encodeURI(url)
  }
}

// 发送get请求
// 提供一个转码的钩子 fn
exports.get = (url, protocol = 'http', fn) => {
  // 检查协议是哪一种 以决定使用对应的库
  if (protocol === 'http') {
    protocol = http
  }
  else if (protocol ==='https') {
    protocol = https
  }
  else {
    return false
  }
  return new Promise((res, rej) => {
    let data = ''
    url = encodeURI(url)
    protocol.get(url, response => {
      response.on('data', chunk => { if (chunk) { data += chunk } })
      response.on('end', () => {
        if (fn) data = fn(data)
        res(data)
      })
      response.on('error', err => { rej(err) })
    })
  })
}
