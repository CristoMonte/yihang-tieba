const compose = require('koa-compose')
const Router = require('koa-router')
const convert = require('koa-convert')
const config = require('../configs')
const zhidao = require('./zhidao')

module.exports = function proxy() {
  const router = new Router({
    prefix: config.app.baseProxy
  })
  zhidao(router)
  return convert.compose([
    router.routes(),
    router.allowedMethods()
  ])
}
