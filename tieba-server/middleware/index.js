const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser')
const convert = require('koa-convert')
const onerror = require('koa-onerror')
const compress = require('koa-compress')

module.exports = function middleware() {
  return convert.compose(
    logger(),
    bodyParser(),
    compress({
      filter: function(content_type) {
        if (/event-stream/i.test(content_type)) {
          return false;
        } else {
          return true;
        }
      },
    })
  )
}
