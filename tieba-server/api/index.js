const compose = require('koa-compose')
const Router = require('koa-router')
const convert = require('koa-convert')
const importDir = require('import-dir')
const config = require('../configs')
const routes = importDir('./routes')

module.exports = function api() {
  const router = new Router({
    prefix: config.app.baseApi
  });
  Object.keys(routes).forEach(name => {
    return routes[name](router)
  });
  return convert.compose([
    router.routes(),
    router.allowedMethods(),
  ]);
}
